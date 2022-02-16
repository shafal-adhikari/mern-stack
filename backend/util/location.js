const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyDgLmMpKCzveJf1_yuA0fUzzhy0WRChvZA";

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=e71df46f518b4a379dd18e09a627e7b7`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }
  console.log(data.results[0].geometry);
  const coordinates = data.results[0].geometry;

  return coordinates;
}

module.exports = getCoordsForAddress;
