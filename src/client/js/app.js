// WEB API 
// Global Variables
const geoNamesURL = 'api.geonames.org/searchJSON?'
      pixaBayURL ='https://pixabay.com/api/'
      apiKeyPixabay='27995832-6c0e40861203c9351e312e73c'
      CurrentWeatherURL ='https://api.weatherbit.io/v2.0/current' //Only supports GET request
      ForecastWeatherURL ='https://api.weatherbit.io/v2.0/forecast/daily' //Only supports GET request
      apiKeyWeatherbit='2130296c39a7402da71ece28eff267f9'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'/'+ d.getDate()+'/'+ d.getFullYear();

// Listen to "Generate" Button 
document.getElementById('generate').addEventListener('click', performAction);

// Function after clicking on "Generate" 
function performAction(e) {
  const enteredZip = document.getElementById('zip').value;
  const feel = document.getElementById('feelings').value;

    //   //Remove fade class from DOM elements
    document.getElementById('temp').classList ='';
    document.getElementById('content').classList ='';
    document.getElementById("date").classList ='';

  getZipData(ZipURL, enteredZip, apiKey)

  .then(() => getWeatherData(WeatherURL, geoData.lat, geoData.lon, apiKey))

  .then(data =>{
    const getTemp =data.main.temp;
    return getTemp;
  })

  .then(getTemp => postData('/data', {getTemp, newDate, feel}))
  .then(() => retrieveData());
}


// get latitude and longitude of zip code 
const getZipData = async (ZipURL, enteredZip, apiKey) => {
 
  const res = await fetch (ZipURL+enteredZip+apiKey)

    try {
      const data = await res.json();
      
      lat = data.lat;
      lon = data.lon;
      geoData= {
        lat,
        lon
      };

      return geoData;
    }
    catch(error) {
      console.log("error", error);
  }
}

// get weather data in entered zip code 
const getWeatherData = async (WeatherURL, lat, lon, apiKey) => {

  const res = await fetch (WeatherURL+lat+'&lon='+lon+apiKey)
  
    try {
      const data = await res.json();
      return data;
    }
    catch(error) {
      console.log("error", error);
  }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        const newData = await response.json();
        console.log(newData);

      }catch(error) {

      // appropriately handle the error
      console.log("error", error);
      }
  }
// retrieve data from localhost and update UI 
  const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('temp').classList = 'fade';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById('content').classList = 'fade';
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("date").classList = 'fade';

    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }