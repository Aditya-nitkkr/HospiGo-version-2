const Doctor = require("../models/doctorSchema");
const DoctorSlotTemplate = require("../models/doctorSlotTemplateSchema");
// const HospitalAdmin = require("../models/hospitalAdmin");
const { handleHashPassword } = require("../controllers/bcryptAuth");
const User = require("../models/userSchema");

const SPECIALTIES = [
  "Cardiology",
  "Orthopedics",
  "General Medicine",
  "Pediatrics",
  "Dermatology",
];

const FIRST_NAMES = ["Rahul", "Priya", "Anjali", "Vikram", "Sneha"];

// Each time slot now carries its own default capacity, not a 1:1 document per booking
const TIME_SLOTS_WITH_CAPACITY = [
  { time: "09:00 AM", defaultCapacity: 20 },
  { time: "10:30 AM", defaultCapacity: 10 },
  { time: "12:00 PM", defaultCapacity: 5 },
  { time: "02:00 PM", defaultCapacity: 20 },
  { time: "04:30 PM", defaultCapacity: 10 },
];

const WORKING_DAYS = [1, 2, 3, 4, 5]; // Mon–Fri

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const generateFakeDoctorsAndAdmin = async (hospitalId, hospitalName) => {
  // Create 3-5 fake doctors
  const doctorCount = 3 + Math.floor(Math.random() * 3);
  const doctors = [];
  for (let i = 0; i < doctorCount; i++) {
    const doc = await Doctor.create({
      hospitalId,
      name: `Dr. ${FIRST_NAMES[i % FIRST_NAMES.length]}`,
      specialty: SPECIALTIES[i % SPECIALTIES.length],
    });
    doctors.push(doc);
  }

  const templateDocs = doctors.map((doctor) => ({
    doctorId: doctor._id,
    hospitalId,
    workingDays: WORKING_DAYS,
    timeSlots: TIME_SLOTS_WITH_CAPACITY,
  }));

  await DoctorSlotTemplate.insertMany(templateDocs);

  const defaultPassword = "hospital123";
  const hashedPassword = await handleHashPassword(defaultPassword);

  // creating the hospital admin at the time of hospital creation
  const newAdminUser = await User.create({
    // hospitalId,
    username: `${slugify(hospitalName)}`,
    email: `${slugify(hospitalName)}@demo.com`,
    password: hashedPassword,
    role: "admin",
    hospitalId: hospitalId,
  });

  // console.log(
  //   ` Seeded ${doctors.length} doctors,  and admin login for "${hospitalName}"`,
  // );
  return { adminUserId: newAdminUser._id };
};

module.exports = {
  generateFakeDoctorsAndAdmin,
};
