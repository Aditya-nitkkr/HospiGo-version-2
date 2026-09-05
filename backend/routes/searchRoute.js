const express = require("express");
const {
  searchNearby,
  autoComplete,
} = require("../controllers/hospitalControllers");
const router = express.Router();

router.get("/nearby", searchNearby);
router.get("/autocomplete", autoComplete);

module.exports = router;
