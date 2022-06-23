var path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

// Create a new date instance dynamically with JS
let d           = new Date(),
    todayYear   = d.getFullYear(),
    todayMonth  = d.getMonth() +1,
    todayDay    = d.getDate();

console.log(`Heute ist der ${todayDay}.${todayMonth}.${todayYear}`)

let name = "",
    geo = {
      lat: 0,
      long: 0
  },
    date = "01.01.2022"

// Reset variable projectData
projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// To avoid an error with ssl-certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Setup Server

const port = 3000;

const server = app.listen(port, listening);
function listening() {
  console.log(server);
  console.log(`Server is running on localhost: ${port}`);
}

// GET route
app.get("/all", sendData);

function sendData(req, res) {
  console.log(projectData);
  res.send(projectData);
}

// POST route
app.post("/data", addData);

// function after pressing the "submit button"
async function addData(req, res) {
  name = req.body.destination;
  date = new Date (req.body.date)
  console.log(date)
  console.log(JSON.stringify(name),JSON.stringify(date))
  await action()
  projectData ={
    "picture": picURL
  }
  res.send(projectData)
}

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})


// Function to fetch Latitude and Longitude from geoNamesURL.org
const geoNamesURL = "http://api.geonames.org/searchJSON?"

const getLatLon = async () => {
  await fetch(`${geoNamesURL}q=${name}&maxRows=1&username=${process.env.geoNamesUsername}`)
    .then(res => {
      const body = res.json();
      return body;
    })
    .then(body => {
      console.log('============Get Geo Data=============')
      geo.long = body.geonames[0].lng
      geo.lat = body.geonames[0].lat
      console.log(geo)
      console.log('============Get Geo Data End =============')

    })
    .catch(error => {
      console.log("error", error);
    });
};

// Function to fetch Current Weather from weatherbit.io
const CurrentWeatherURL = "https://api.weatherbit.io/v2.0/current?" //Only supports GET request

//example: https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely

const getCurrentWeather = async () => {
  await fetch(`${CurrentWeatherURL}&lat=${geo.lat}&lon=${geo.long}&key=${process.env.apiKeyWeatherbitkey}`)
    .then(res => {
      const body = res.json();
      return body;
    })
    .then(body => {
      console.log('============Current Weather=============')
      console.log(body)
      console.log('============Current Weather End=============')
    })
    .catch(error => {
      console.log("error", error);
    });
};

const FutureURL = "https://api.weatherbit.io/v2.0/forecast/daily?";

// example:https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

const getFutureWeather = async () => {
  await fetch(`${FutureURL}&lat=${geo.lat}&lon=${geo.long}&key=${process.env.apiKeyWeatherbitkey}`)
    .then(res => {
      const body = res.json();
      return body;
    })
    .then(body => {
      console.log('============Future Weather=============')
      console.log(body);
      console.log('============Future Weather End=============')
    })
    .catch(error => {
      console.log("error", error);
    });
};

// example: https://pixabay.com/api/?key=***************=yellow+flowers&image_type=photo

  const pixaBayURL = "https://pixabay.com/api/?";
  let   picURL="";

const getPic = async () => {
  await fetch(`${pixaBayURL}${process.env.apiKeyPixabay}q=${name}&image_type=photo`)
    .then((res) => {
      const body = res.json();
      return body;
    })
    .then(body => {
      console.log('============Pixabay=============')
      console.log(body.hits[0].webformatURL);
      picURL  = body.hits[0].webformatURL;
      console.log('============Pixabay End=============')
    })
    .catch(error => {
      console.log("error", error);
    });
};

const action = async () => {
  await getLatLon()
    .then( async () => {
      await checkDate();
    })
    .then(async () => {
      await getCurrentWeather();
    })
    .then(async () => {
      await getFutureWeather();
    })
    .then(async () => {
      await getPic();
    })
};

//function for checking date
const checkDate = async () =>{
  const year  = date.getFullYear()
  const month = date.getMonth() + 1
  const day   = date.getDate()

  console.log(`Hier steht das Jahr ${year}, hier der Monat ${month} und hier der Tag ${day}`)



}