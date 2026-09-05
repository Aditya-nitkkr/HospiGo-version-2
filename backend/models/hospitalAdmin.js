const mongoose = require("mongoose");

const hospitalAdminSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
});

const HospitalAdmin = mongoose.model("HospitalAdmin", hospitalAdminSchema);
module.exports = HospitalAdmin;
