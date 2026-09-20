const Hospital = require("../models/hospitalData");
const { fetchHospitalsNearby } = require("./externalApiService");
const { generateFakeDoctorsAndAdmin } = require("./fakeDataGeneratorService");

const MIN_RESULTS_THRESHOLD = 5;

const getNearbyHospitals = async (lat, lng, radiusMeters = 10000) => {
  const existing = await Hospital.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: radiusMeters,
      },
    },
  });

  if (existing.length >= MIN_RESULTS_THRESHOLD) {
    return existing; // cache hit — no external call needed
  }

  const externalResults = await fetchHospitalsNearby(lat, lng, radiusMeters);
  for (const place of externalResults) {
    const hospital = await Hospital.findOneAndUpdate(
      { externalId: place.osm_id },
      {
        $setOnInsert: {
          externalId: place.osm_id,
          name: place.name || place.display_name,
          address: place.display_name,
          location: {
            type: "Point",
            coordinates: [parseFloat(place.lon), parseFloat(place.lat)],
          },
        },
      },
      { upsert: true, new: true },
    );

    if (!hospital.isSeeded) {
      const { adminUserId } = await generateFakeDoctorsAndAdmin(
        hospital._id,
        hospital.name,
      );
      hospital.hospitalId = adminUserId;
      hospital.isSeeded = true;
      await hospital.save();
    }
  }

  return Hospital.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: radiusMeters,
      },
    },
  });
};

module.exports = { getNearbyHospitals };
