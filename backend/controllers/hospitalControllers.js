const { getNearbyHospitals } = require("../services/hospitalService");

const searchNearby = async (req, res) => {
  const { lat, lng, radius } = req.query;
  console.log(req.query);
  const hospitals = await getNearbyHospitals(
    parseFloat(lat),
    parseFloat(lng),
    radius ? parseInt(radius) : undefined,
  );
  const hospital = res.json(hospitals);
  // console.log("Hospital data ", hospital);
};

module.exports = { searchNearby };
