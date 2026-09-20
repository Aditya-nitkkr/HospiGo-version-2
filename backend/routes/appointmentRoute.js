const express = require("express");
const {
  handleSaveAppointment,
  handleFetchAppointments,
  handleAppointmentStatus,
  getHospitalEmail,
  getSlotsByDate,
} = require("../controllers/appointmentControllers");
const { isAdmin } = require("../authentication/jwt-auth");
const router = express.Router();

router.post("/create", handleSaveAppointment);
router.get("/admin", isAdmin, handleFetchAppointments);
router.put("/admin/update-status/:status_id", isAdmin, handleAppointmentStatus);
router.get("/hospital/:id", getHospitalEmail);
router.get("/slots", getSlotsByDate);

module.exports = router;
