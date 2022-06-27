var path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

// Create a new date instance dynamically with JS
let getDate         = new Date,
    year            = getDate.getFullYear(),
    month           = getDate.getMonth(),
    day             = getDate.getDate(),
    today           = new Date(year, month, day),
    timeOffset      = getDate.getTimezoneOffset()*60*1000, // Get the timezone in minutes. Has to be changed to milliseconds (*60*1000)
    future          = false,
    past            = false,
    temp            = 0,
    icon            ='',
    description     ='',
    picURL          =""


console.log(`Heute ist der ${today}`)

let name = "",
    geo = {
      lat: 0,
      long: 0
  }

// Reset variable projectData
let projectData={
};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

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
  enteredDate = new Date (req.body.date)
  console.log(enteredDate)
  console.log(JSON.stringify(name),JSON.stringify(enteredDate))
  await action()
  projectData ={
    picURL,
    temp,
    iconURL: `https://www.weatherbit.io/static/img/icons/${icon}.png`,
    description
  }
  console.log(projectData)
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
      temp        = body.data[0].temp
      icon        = body.data[0].weather.icon
      description = body.data[0].weather.description
      console.log(projectData)
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
        temp        = body.data[0].temp
        icon        = body.data[0].weather.icon
        description = body.data[0].weather.description
      console.log(projectData)
      console.log('============Future Weather End=============')
    })
    .catch(error => {
      console.log("error", error);
    });
};

// example: https://pixabay.com/api/?key=***************=yellow+flowers&image_type=photo

  const pixaBayURL = "https://pixabay.com/api/?";

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
    .then( async () => {
      if (past === true) {
        console.log('Entered Date is in the past')
      }
      else if (future===true) {
        await getFutureWeather()
      }
      else {
        await getCurrentWeather()
      }
    })
    .then(async () => {
      await getPic();
    })
    // .then(async () => {
    //   await getCurrentWeather();
    // })
    // .then(async () => {
    //   await getFutureWeather();
    // })
    
};

//function for checking date
const checkDate = async () =>{
  const diff            = (enteredDate -today)+timeOffset,
        diffDays        = diff/1000/60/60/24
  future          =false
  past            =false

  if (diffDays < 0) {
    past=true
  }
  else if (diffDays > 7){
    future=true
  }

  console.log(`Hier steht die Zeit-Differenz in Tagen: ${diffDays}`)



}