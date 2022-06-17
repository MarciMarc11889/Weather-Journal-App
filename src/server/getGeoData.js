const fetch = require("node-fetch")


const getLatLon = async () => {
    const name = require('./index'),
    geoNamesURL = "http://api.geonames.org/searchJSON?",
    username = "marcimarc11889",
    geo = require('./index');
    console.log(name)

    await fetch(`${geoNamesURL}q=${name}&maxRows=1&username=${username}`)
      .then(res => {
        const body = res.json();
        return body;
      })
      .then(body => {
        console.log(body)
        geo.long = body.geonames[0].lng;
        geo.lat = body.geonames[0].lat;
        console.log(geo);
        return geo
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  module.exports = getLatLon