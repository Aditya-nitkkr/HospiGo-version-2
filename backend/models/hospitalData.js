const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  externalId: { type: String, unique: true, required: true }, // osm_id / place_id from the API
  name: String, // name of the hospital
  address: String, // address of the hospital
  // location of the hospital
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isSeeded: { type: Boolean, default: false }, // true once doctors/admin are attached
  createdAt: { type: Date, default: Date.now },
});

hospitalSchema.index({ location: "2dsphere" });

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
