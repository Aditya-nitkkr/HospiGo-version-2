const Hospital = require("../models/hospitalData");
const { fetchHospitalsNearby } = require("./externalApiService");
const { generateFakeDoctorsAndAdmin } = require("./fakeDataGeneratorService");

const MIN_RESULTS_THRESHOLD = 5;

const getNearbyHospitals = async (lat, lng, radiusMeters = 10000) => {
  // 1. Check what you already have
  const existing = await Hospital.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: radiusMeters,
      },
    },
  });

  if (existing.length >= MIN_RESULTS_THRESHOLD) {
    // console.log("catch request");
    return existing; // cache hit — no external call needed
  }

  // 2. Cache miss — fetch from external API
  const externalResults = await fetchHospitalsNearby(lat, lng, radiusMeters);
  //   console.log(externalResults);

  // 3. Upsert each result
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

    // 4. Only generate fake doctors/admin the FIRST time this hospital appears
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

  // 5. Re-query  DB now that it's populated
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
