const express = require("express");
const {
  searchNearby,
  autoComplete,
  getHospitals,
  getHospitalById,
} = require("../controllers/hospitalControllers");
const router = express.Router();

router.get("/nearby", searchNearby);
router.get("/autocomplete", autoComplete);
router.get("/hospital/:id", getHospitals);
router.get("/user/hospital/:id", getHospitalById);

module.exports = router;
