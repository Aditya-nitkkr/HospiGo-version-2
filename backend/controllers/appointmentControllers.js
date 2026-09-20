const Appointment = require("../models/appointmentSchema");
const { bookSlot } = require("../services/bookingService");
const DailySlotStatus = require("../models/dailySlotStatusSchema");
const Hospital = require("../models/hospitalData");
const DoctorSlotTemplate = require("../models/doctorSlotTemplateSchema");

// Function to make the appointment
const handleSaveAppointment = async (req, res) => {
  const { appointmentDate, doctorId, hospitalId, selectSlot, mobile } =
    req.body;
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
    await bookSlot(doctorId, hospitalId, appointmentDate, selectSlot);

    try {
      const newAppointment = new Appointment(req.body);
      await newAppointment.save();
    } catch (saveError) {
      if (saveError === 11000) {
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
    if (error.message.includes("full") || error.message.includes("blocked")) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to make appointment" });
  }
};

// Function to fetch all the appointments for the particular hospital
const handleFetchAppointments = async (req, res) => {
  const { id } = req.user;
  try {
    const appointments = await Appointment.find({ hospitalId: id });
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

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
  const { id } = req.user; 
  const { status_id } = req.params;

  try {
    const appointment = await Appointment.findById(status_id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.hospitalId.toString() !== id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this appointment" });
    }

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


const getSlotsByDate = async (req, res) => {
  try {
    const { doctorId, hospitalId, date } = req.query;

    if (!doctorId || !hospitalId || !date) {
      return res
        .status(400)
        .json({ message: "doctorId, hospitalId, and date are required" });
    }

    const template = await DoctorSlotTemplate.findOne({ hospitalId, doctorId });
    if (!template) {
      return res.json({ slots: [] });
    }

    const dailyStatuses = await DailySlotStatus.find({
      hospitalId,
      doctorId,
      date,
    }).lean();

    const statusMap = new Map(dailyStatuses.map((s) => [s.time.trim(), s]));

    const slots = template.timeSlots.map((ts) => {
      const status = statusMap.get(ts.time.trim());

      if (status?.isBlocked) {
        return { time: ts.time, capacity: 0 };
      }

      const totalCap = status?.capacityOverride ?? ts.defaultCapacity;
      const booked = status?.bookedCount || 0;

      return {
        time: ts.time,
        capacity: Math.max(0, totalCap - booked),
      };
    });

    return res.json({ slots });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleSaveAppointment,
  handleFetchAppointments,
  handleAppointmentStatus,
  getHospitalEmail,
  getSlotsByDate,
};
