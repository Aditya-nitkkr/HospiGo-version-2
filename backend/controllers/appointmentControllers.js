const Appointment = require("../models/appointmentSchema");
const { bookSlot } = require("../services/bookingService");
const DailySlotStatus = require("../models/dailySlotStatusSchema");

// Function to make the appointment
const handleSaveAppointment = async (req, res) => {
  // console.log(req);
  const { appointmentDate, doctorId, hospitalId, selectSlot } = req.body;
  // console.log("req body", req.body);

  try {
    // Step 1: Try to reserve capacity FIRST — this is the real source of truth,
    // not a duplicate-check on the Appointment collection.
    await bookSlot(doctorId, hospitalId, appointmentDate, selectSlot);

    // Step 2: Only if capacity was successfully reserved, create the appointment record
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();

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
  const { hospitalId } = req.user;
  // console.log(email);

  try {
    const appointments = await Appointment.find({ hospitalId });
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
  const { status } = req.body;
  const { hospitalId } = req.user; // the logged-in admin's own hospital

  try {
    const appointment = await Appointment.findById(req.params.status_id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Ownership check — prevents one hospital admin editing another hospital's appointment
    if (appointment.hospitalId.toString() !== hospitalId.toString()) {
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
module.exports = {
  handleSaveAppointment,
  handleFetchAppointments,
  handleAppointmentStatus,
};
