const express = require("express");
const {
  handleSaveAppointment,
  handleFetchAppointments,
  handleAppointmentStatus,
  getHospitalEmail,
} = require("../controllers/appointmentControllers");
const { isAdmin } = require("../authentication/jwt-auth");
const router = express.Router();

router.post("/create", handleSaveAppointment);
router.get("/admin", isAdmin, handleFetchAppointments);
router.put("/admin/update-status/:status_id", isAdmin, handleAppointmentStatus);
router.get("/hospital/:id", getHospitalEmail);

module.exports = router;
