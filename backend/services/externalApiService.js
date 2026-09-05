// services/externalLocationApi.js
// import axios from "axios";
// import 'dotenv/config';
const axios = require("axios");

const fetchHospitalsNearby = async (lat, lon, radius = 10000) => {
  const options = {
    method: "GET",
    url: "https://api.locationiq.com/v1/nearby",
    params: {
      lat,
      lon,
      tag: "hospital",
      radius,
      limit: 10,
      key: process.env.LOCATIONIQ_KEY,
      format: "json",
    },
    headers: { accept: "application/json" },
  };

  const res = await axios.request(options);
  return res.data;
};

module.exports = { fetchHospitalsNearby };
