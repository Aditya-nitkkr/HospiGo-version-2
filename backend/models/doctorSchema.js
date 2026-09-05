const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  name: String,
  specialty: String,
});
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
