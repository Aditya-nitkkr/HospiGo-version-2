const { autocompleteLocation } = require("../services/externalApiService");
const { getNearbyHospitals } = require("../services/hospitalService");

// search the location on the basis of lat and the lon
const searchNearby = async (req, res) => {
  const { lat, lng, radius } = req.query;
  const parsedLat = parseFloat(lat);
  const parsedLng = parseFloat(lng);

  if (isNaN(parsedLat) || isNaN(parsedLng)) {
    return res.status(400).json({
      message:
        "lat and lng query params are required and must be valid numbers",
    });
  }
  try {
    const hospitals = await getNearbyHospitals(
      parseFloat(lat),
      parseFloat(lng),
      radius ? parseInt(radius) : undefined,
    );
    // console.log(hospitals);
    return res.json(hospitals);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch nearby hospitals" });
  }

  // console.log("Hospital data ", hospital);
};

// auto complete function to get the lon and lat for any location
const autoComplete = async (req, res) => {
  const { query } = req.query;
  // console.log("query: ", query);
  if (!query || query.trim().length < 2) {
    return res.json([]);
  }
  try {
    const suggestions = await autocompleteLocation(query);
    // console.log("suggestion, ", suggestions);
    return res.json(suggestions);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch suggestions" });
  }
};

module.exports = { searchNearby, autoComplete };
