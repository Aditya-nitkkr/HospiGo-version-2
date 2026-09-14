const Appointment = require("../models/appointmentSchema");
const { bookSlot } = require("../services/bookingService");
const DailySlotStatus = require("../models/dailySlotStatusSchema");
const User = require("../models/userSchema");
const Hospital = require("../models/hospitalData");

// Function to make the appointment
const handleSaveAppointment = async (req, res) => {
  // console.log(req);
  const { appointmentDate, doctorId, hospitalId, selectSlot, mobile } =
    req.body;
  // console.log("req body", req.body);
  // console.log(appointmentDate, doctorId, hospitalId, selectSlot, mobile);

  try {
    const existingActive = await Appointment.findOne({
      doctorId,
      appointmentDate,
      mobile,
      status: { $in: ["Pending", "Accepted"] },
    });

    if (existingActive) {
      return res.status(409).json({
        message:
          "You already have an active appointment with this doctor on this date",
      });
    }
    //  Try to reserve capacity FIRST — this is the real source of truth,
    // not a duplicate-check on the Appointment collection.
    // it only check the capacity of the slot
    await bookSlot(doctorId, hospitalId, appointmentDate, selectSlot);

    // handling the rollback by the same patient
    try {
      //  Only if capacity was successfully reserved, create the appointment record
      const newAppointment = new Appointment(req.body);
      // console.log("new appointment:  ", newAppointment);
      await newAppointment.save();
    } catch (saveError) {
      // {11000} mongoDb duplicate key error
      if (saveError === 11000) {
        // then rollback the book slot so that the slot is not wasted
        await DailySlotStatus.findOneAndUpdate(
          { doctorId, date: appointmentDate, time: selectSlot },
          { $inc: { bookedCount: -1 } },
        );

        return res.status(409).json({
          message:
            "You already have an active appointment with this doctor on this date",
        });
      }
    }

    return res
      .status(201)
      .json({ message: "Successfully made an appointment" });
  } catch (error) {
    console.error(error);
    // bookSlot throws a specific message when the slot is full/blocked
    if (error.message.includes("full") || error.message.includes("blocked")) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to make appointment" });
  }
};

// Function to fetch all the appointments for the particular hospital
const handleFetchAppointments = async (req, res) => {
  const { id } = req.user;
  // console.log("req user: ", req.user);
  // console.log("hosital id:  in appointments: ", id);

  try {
    const appointments = await Appointment.find({ hospitalId: id });
    // console.log("appointments  of hospital: ", appointments);

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    // console.log(typeof appointments);

    return res
      .status(200)
      .json({ message: "Fetch the appointments", appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// Function to make the appointment accepted or rejected by the hospital
// admin

const handleAppointmentStatus = async (req, res) => {
  console.log(req.user);
  const { status } = req.body;
  const { id } = req.user; // the logged-in admin's own hospital
  console.log("id: ", id);
  const { status_id } = req.params;

  try {
    const appointment = await Appointment.findById(status_id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Ownership check — prevents one hospital admin editing another hospital's appointment
    console.log(appointment.hospitalId.toString());
    console.log(id.toString());

    if (appointment.hospitalId.toString() !== id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this appointment" });
    }

    // If the hospital rejects, free up the slot capacity that was reserved at booking time
    if (status === "Rejected" && appointment.status !== "Rejected") {
      await DailySlotStatus.findOneAndUpdate(
        {
          doctorId: appointment.doctorId,
          date: appointment.appointmentDate,
          time: appointment.selectSlot,
        },
        { $inc: { bookedCount: -1 } },
      );
    }

    appointment.status = status;
    await appointment.save();

    return res.send(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};

const getHospitalEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findById(id);
    return res.status(200).json(hospital.hospitalId);
  } catch (error) {
    console.log("error in fetching the hospital mail: ", error);
    return res.status(404);
  }
};

module.exports = {
  handleSaveAppointment,
  handleFetchAppointments,
  handleAppointmentStatus,
  getHospitalEmail,
};
