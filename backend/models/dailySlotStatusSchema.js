const mongoose = require("mongoose");

const dailySlotStatusSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  
  // is the capacity for the particular doctor for a particular time changed or not
  capacityOverride: { type: Number, default: null },

  // number of booking for a slot
  bookedCount: { type: Number, default: 0 },

  // is the doctor available for the particular slot or not
  isBlocked: { type: Boolean, default: false },
});

dailySlotStatusSchema.index(
  { doctorId: 1, date: 1, time: 1 },
  { unique: true },
);

const DailySlotStatus = mongoose.model(
  "DailySlotStatus",
  dailySlotStatusSchema,
);

module.exports = DailySlotStatus;
