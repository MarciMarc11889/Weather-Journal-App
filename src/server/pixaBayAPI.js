const fetch = require("node-fetch")

// example: https://pixabay.com/api/?key=27995832-6c0e40861203c9351e312e73c&q=yellow+flowers&image_type=photo

const getPic = async () => {
    const apiKeyPixabay = "key=27995832-6c0e40861203c9351e312e73c&",
    pixaBayURL = "https://pixabay.com/api/?",

    name = require("./index"),
    destination = `q=${name}`

  await fetch(`${pixaBayURL}${apiKeyPixabay}${destination}&image_type=photo`)
    .then((res) => {
      const body = res.json();
      return body;
    })
    .then(body => {
      console.log(body.hits[0]);
    })
    .catch(error => {
      console.log("error", error);
    });
};
module.exports = getPic