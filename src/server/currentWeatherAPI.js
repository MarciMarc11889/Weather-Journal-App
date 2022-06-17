const { json } = require("body-parser")
const fetch = require("node-fetch")
const geo = require("./index")

// Function to fetch Current Weather from weatherbit.io
const CurrentWeatherURL = "https://api.weatherbit.io/v2.0/current?", //Only supports GET request
  apiKeyWeatherbitkey = "2130296c39a7402da71ece28eff267f9";

//example: https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely

const getCurrentWeather = async () => {
    await fetch(
      `${CurrentWeatherURL}&lat=${geo.lat}&lon=${geo.long}&key=${apiKeyWeatherbitkey}`
    )
      .then(res => {
        const body = res.json();
        return body;
      })
      .then(body => {
        console.log(`The current weather is: ${body}`);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  module.exports = getCurrentWeather