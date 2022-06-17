const fetch = require("node-fetch")
const geo = require("./index")

const FutureURL = "https://api.weatherbit.io/v2.0/forecast/daily?",
apiKeyWeatherbitkey = "2130296c39a7402da71ece28eff267f9"


// example:https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

const getFutureWeather = async () => {
    
    console.log(geo)
  await fetch(
    `${FutureURL}&lat=${geo.lat}&lon=${geo.long}&key=${apiKeyWeatherbitkey}`
  )
    .then(res => {
      const body = res.json();
      return body;
    })
    .then(body => {
      console.log(`The future weather is ${body}`);
    })
    .catch(error => {
      console.log("error", error);
    });
};

module.exports = getFutureWeather