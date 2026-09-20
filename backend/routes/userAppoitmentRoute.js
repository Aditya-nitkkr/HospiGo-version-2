const express = require("express");
const {
  handleUserAppointment,
  handleDeleteUserAppointment,
} = require("../controllers/userAppointment");
const { requireAuth } = require("../authentication/jwt-auth");

const router = express.Router();

router.get("/appointment", requireAuth, handleUserAppointment);
router.delete("/appointment/:id", requireAuth, handleDeleteUserAppointment);

module.exports = router;
