// const getLatLon = require('./getLatLon.js')

const fetch = require('node-fetch')


// Reset variable projectData 
// projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');


// Cors for cross origin allowance
app.use(cors(''));

// Initialize the main project folder
app.use(express.static('dist'));

// Function to fetch Latitude and Longitude from geoNamesURL.org
const   geoNamesURL = 'http://api.geonames.org/searchJSON?',
        username    = 'marcimarc11889',
        name        = 'Berlin'
let     geo = {
          lat:0,
          long:0
        }

const getLatLon = async (name, geoNamesURL, username ) => {
  await fetch(`${geoNamesURL}q=${name}&maxRows=1&username=${username}`) 
    .then(res => { 
        const body = res.json();
        return body
    })
    .then((body) => {
      geo.long = body.geonames[0].lng
      geo.lat = body.geonames[0].lat
      console.log(`The Geo Data is: ${geo}`)
    })
    .catch(error => {
      console.log("error", error);
    })
} 

// Function to fetch Current Weather from weatherbit.io
const   CurrentWeatherURL = 'https://api.weatherbit.io/v2.0/current?', //Only supports GET request
        apiKeyWeatherbitkey='2130296c39a7402da71ece28eff267f9'

//example: https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include=minutely


const getCurrentWeather = async () => {
  await fetch(`${CurrentWeatherURL}&lat=${geo.lat}&lon=${geo.long}&key=${apiKeyWeatherbitkey}`) 
    .then(res => { 
        const body = res.json();
        return body
    })
    .then(body => {
      console.log(`The current weather is: ${body}`)
    })
    .catch(error => {
      console.log("error", error);
    })
}

const   FutureURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'

// example:https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

const getFutureWeather = async () => {
  await fetch(`${FutureURL}&lat=${geo.lat}&lon=${geo.long}&key=${apiKeyWeatherbitkey}`) 
    .then(res => { 
        const body = res.json();
        return body
    })
    .then(body => {
      console.log(`The future weather is ${body}`)
    })
    .catch(error => {
      console.log("error", error);
    })
}

// example: https://pixabay.com/api/?key=27995832-6c0e40861203c9351e312e73c&q=yellow+flowers&image_type=photo

const apiKeyPixabay='key=27995832-6c0e40861203c9351e312e73c&',
      pixaBayURL ='https://pixabay.com/api/?',
      destination= `q=${name}`

const getPic = async () => {
  await fetch(`${pixaBayURL}${apiKeyPixabay}${destination}&image_type=photo`) 
    .then(res => { 
        const body = res.json();
        return body
    })
    .then(body => {
      console.log(`The example picture: ${body.hits[0]}`)
    })
    .catch(error => {
      console.log("error", error);
    })
}


const action = async ()=>{
  await getLatLon(name, geoNamesURL, username)
  .then(()=>{
    getCurrentWeather()
  })
  .then(()=>{
    getFutureWeather()
  })
  .then(()=>{
    getPic()
  })

}

action()

// Setup Server

const port = 3000;

const server = app.listen(port, listening);
 function listening(){
    console.log(server);
    console.log(`Server is running on localhost: ${port}`);
  };

  // GET route
app.get('/all', sendData);

function sendData (req, res) {
  console.log(projectData);
  res.send(projectData);
};

// POST route
app.post('/data', addData);

function addData (req,res){
  geo('London')



// console.log(req.body);
//   projectData ={

//     temp: req.body.getTemp,
//     date: req.body.newDate,
//     feel: req.body.feel
//   }; 

  res.send(projectData);
}