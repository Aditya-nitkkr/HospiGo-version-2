// services/externalLocationApi.js
// import axios from "axios";
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

const autocompleteLocation = async (query) => {
  const options = {
    method: "GET",
    url: "https://api.locationiq.com/v1/autocomplete",
    params: {
      q: query,
      limit: 5,
      key: process.env.LOCATIONIQ_KEY,
      format: "json",
    },
    headers: { accept: "application/json" },
  };

  // console.log(process.env.LOCATIONIQ_KEY);
  const res = await axios.request(options);
  

  // console.log(typeof res.data);
  // console.log(res.data);

  return res.data;
};
module.exports = { fetchHospitalsNearby, autocompleteLocation };
