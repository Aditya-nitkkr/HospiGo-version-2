const express = require("express");
const { searchNearby } = require("../controllers/hospitalControllers");
const router = express.Router();

router.get("/nearby", searchNearby);

module.exports = router;
