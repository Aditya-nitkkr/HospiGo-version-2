const { default: mongoose } = require("mongoose");
const DoctorSlotTemplate = require("../models/doctorSlotTemplateSchema");
const Hospital = require("../models/hospitalData");
const { autocompleteLocation } = require("../services/externalApiService");
const { getNearbyHospitals } = require("../services/hospitalService");
const Doctor = require("../models/doctorSchema");

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

const getHospitals = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Fetch hospital details
    const hospital = await Hospital.findById(id).lean();
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    // console.log(hospital);

    // 2. Fetch slot templates for this hospital (no populate needed)

    const slotTemplates = await DoctorSlotTemplate.find({ hospitalId: id });

    // console.log(slotTemplates);

    if (!slotTemplates || slotTemplates.length === 0) {
      return res.json({ hospital, doctors: [] });
    }

    // 3. Extract doctorIds, filtering out any malformed/null entries defensively
    const doctorIds = slotTemplates
      .map((template) => template.doctorId)
      .filter(Boolean);

    // 4. Fetch all doctors whose _id is in doctorIds
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).lean();

    // 5. Build a lookup map instead of .find() inside .map() — O(n) instead of O(n*m)
    const templateByDoctorId = new Map(
      slotTemplates.map((t) => [t.doctorId.toString(), t]),
    );

    const doctorsWithSlots = doctors.map((doctor) => {
      const template = templateByDoctorId.get(doctor._id.toString());

      const availableSlots =
        template?.timeSlots?.map((ts) => ({
          time: ts.time,
          capacity: ts.defaultCapacity,
        })) ?? [];

      return {
        ...doctor,
        slots: availableSlots,
        workingDays: template?.workingDays ?? [],
      };
    });

    // console.log("Doctors found for this hospital:", doctorsWithSlots.length);

    return res.json({ hospital, doctors: doctorsWithSlots });
  } catch (err) {
    console.error("getHospitalById error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// router.get("/user/hospital/:id", getHospitalById);

const getHospitalById = async (req, res) => {
  try {
    // FIX: Use req.params instead of req.query because it is a URL parameter (:id)
    const { id } = req.params;
    // console.log("Requested hospital ID:", id);

    const hospital = await Hospital.findOne({ hospitalId: id });
    // console.log("Hospital data in user profile: ", hospital);

    // Always good practice to check if it actually exists in the database
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    return res.status(200).json( hospital);
  } catch (error) {
    console.error("Unable to fetch the hospital:", error);
    // FIX: Send a proper HTTP error status back to the frontend
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getHospitalById, searchNearby, autoComplete, getHospitals };
