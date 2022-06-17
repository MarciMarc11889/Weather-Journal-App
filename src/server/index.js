var path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const express = require("express");

const getPic = require('./pixaBayAPI');
const getFutureWeather = require('./futureWeatherAPI');
const getCurrentWeather = require('./currentWeatherAPI');
const getLatLon = require('./getGeoData')

const { json } = require("body-parser");

// Reset variable projectData
// projectData = {};

// Require Express to run server and routes

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors(""));

// Initialize the main project folder
app.use(express.static("dist"));

// To avoid an error with ssl-certificate
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Function to fetch Latitude and Longitude from geoNamesURL.org
const name = "Berlin";
const geo = {
  lat:0,
  long:0
}

module.exports = name, geo

const action = async () => {
  await getLatLon()
    .then(async () => {
      console.log(geo)
      await getCurrentWeather();
    })
    .then(async () => {
      await getFutureWeather();
    })
    .then(async () => {
      await getPic();
    });
};

action();

// Setup Server

const port = 3000;

const server = app.listen(port, listening);
function listening() {
  // console.log(server);
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

function addData(req, res) {
  res.send(projectData);
}

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

