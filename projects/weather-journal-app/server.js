// Reset variable projectData 
projectData = {};

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
app.use(express.static('website'));


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
  res.send(projectData);
};

// POST route
app.post('/data', addData);

function addData (req,res){
console.log(req.body);
  projectData ={

    temp: req.body.getTemp,
    date: req.body.newDate,
    feel: req.body.feel
  }; 
    // projectData.push(req.body);
    res.send(projectData);
    // console.log(projectData);
}