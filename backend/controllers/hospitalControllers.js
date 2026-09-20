const DoctorSlotTemplate = require("../models/doctorSlotTemplateSchema");
const DailySlotStatus = require("../models/dailySlotStatusSchema");
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
    return res.json(hospitals);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch nearby hospitals" });
  }
};

// auto complete function to get the lon and lat for any location
const autoComplete = async (req, res) => {
  const { query } = req.query;
  if (!query || query.trim().length < 2) {
    return res.json([]);
  }
  try {
    const suggestions = await autocompleteLocation(query);
    return res.json(suggestions);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch suggestions" });
  }
};

const getHospitals = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;
    const targetDate = date || new Date().toISOString().split("T")[0];
   
    const hospital = await Hospital.findById(id).lean();
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const slotTemplates = await DoctorSlotTemplate.find({ hospitalId: id });
    if (!slotTemplates || slotTemplates.length === 0) {
      return res.json({ hospital, doctors: [] });
    }

    const doctorIds = slotTemplates
      .map((template) => template.doctorId)
      .filter(Boolean);

    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).lean();

    const templateByDoctorId = new Map(
      slotTemplates.map((t) => [t.doctorId.toString(), t]),
    );

    const dailyStatuses = await DailySlotStatus.find({
      hospitalId: id,
      doctorId: { $in: doctorIds },
      date: targetDate,
    }).lean();

    const statusMap = new Map(
      dailyStatuses.map((status) => [
        `${status.doctorId.toString()}_${status.time}`,
        status,
      ]),
    );

    const doctorsWithSlots = doctors.map((doctor) => {
      const template = templateByDoctorId.get(doctor._id.toString());
      const docIdStr = doctor._id.toString();

      const availableSlots =
        template?.timeSlots?.map((ts) => {
          const statusKey = `${docIdStr}_${ts.time}`;
          const dailyStatus = statusMap.get(statusKey);

          const totalCapacity =
            dailyStatus?.capacityOverride !== null &&
            dailyStatus?.capacityOverride !== undefined
              ? dailyStatus.capacityOverride
              : ts.defaultCapacity;

          if (dailyStatus?.isBlocked) {
            return {
              time: ts.time,
              capacity: 0,
            };
          }

          const booked = dailyStatus?.bookedCount || 0;
          const remainingCapacity = Math.max(0, totalCapacity - booked);
          
          return {
            time: ts.time,
            capacity: remainingCapacity,
          };
        }) ?? [];

      return {
        ...doctor,
        slots: availableSlots,
        workingDays: template?.workingDays ?? [],
      };
    });

    return res.json({ hospital, doctors: doctorsWithSlots });
  } catch (err) {
    console.error("getHospitalById error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;
    const hospital = await Hospital.findOne({ hospitalId: id });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    return res.status(200).json(hospital);
  } catch (error) {
    console.error("Unable to fetch the hospital:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getHospitalById, searchNearby, autoComplete, getHospitals };
