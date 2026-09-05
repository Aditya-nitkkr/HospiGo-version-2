const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    defaultCapacity: { type: Number, required: true },
  },
  { _id: false },
);

const doctorSlotTemplateSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
    unique: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  workingDays: [Number],
  timeSlots: [timeSlotSchema],
});

const DoctorSlotTemplate = mongoose.model(
  "DoctorSlotTemplate",
  doctorSlotTemplateSchema,
);

module.exports = DoctorSlotTemplate;
