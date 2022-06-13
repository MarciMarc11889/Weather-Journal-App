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
        username    = 'marcimarc11889'

// http://api.geonames.org/searchJSON?q=london&maxRows=10&username=marcimarc11889

const getLatLon = async (name='', geoNamesURL, username ) => {
  await fetch(`${geoNamesURL}q=${name}&maxRows=1&username=${username}`) 
    .then(res => { 
        const body = res.json();
        return body
    })
    .then(body => {
      const long = body.geonames[0].lng
      const lat = body.geonames[0].lat
      const geo = {long, lat}
      return geo
    })
    .then(geo =>{
      console.log(geo)
    })
}

getLatLon('London', geoNamesURL, username)

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