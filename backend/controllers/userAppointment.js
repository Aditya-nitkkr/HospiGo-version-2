const Appointment = require("../models/appointmentSchema");

const handleUserAppointment = async (req, res) => {
  try {
    const { email } = req.user;

    const userAppointmentData = await Appointment.find({ email });

    return res.status(200).json({ userAppointmentData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch  user appointment" });
  }
};

const handleDeleteUserAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const userEmail = req.user?.email;


    if (!userEmail) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not identified." });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    const appointmentEmail = appointment.email;

    if (appointmentEmail?.toLowerCase() !== userEmail.toLowerCase()) {
      return res.status(403).json({
        message:
          "Forbidden: You are not authorized to cancel this appointment.",
      });
    }

    await Appointment.findByIdAndDelete(appointmentId);

    return res
      .status(200)
      .json({ message: "Appointment cancelled successfully." });
  } catch (err) {
    console.error("Error deleting user appointment:", err);
    return res
      .status(500)
      .json({ message: "Server error deleting appointment." });
  }
};

module.exports = {
  handleUserAppointment,
  handleDeleteUserAppointment,
};
