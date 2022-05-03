// WEB API 
// Global Variables
let ZipURL = 'http://api.openweathermap.org/geo/1.0/zip?zip=', // {zip code},{country code}&appid={API key}'
    WeatherURL= 'https://api.openweathermap.org/data/2.5/weather?lat=',
    apiKey = '&appid=a448a4a826b1fca8eaa50dcd50dbc65d&units=imperial',
    lat = 0, 
    lon = 0,
    geoData = {lat, lon};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Listen to "Generate" Button 
document.getElementById('generate').addEventListener('click', performAction);

// Function after clicking on "Generate" 
function performAction(e) {
  const enteredZip = document.getElementById('zip').value;
  const feel = document.getElementById('feelings').value;
  getZipData(ZipURL, enteredZip, apiKey)

  .then(() => getWeatherData(WeatherURL, geoData.lat, geoData.lon, apiKey))

  .then(data =>{
    const getTemp =data.main.temp;
    return getTemp;
  })

  .then(getTemp => postData('/data', {getTemp, newDate, feel}))
  .then(() => retrieveData());
}

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

  const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }