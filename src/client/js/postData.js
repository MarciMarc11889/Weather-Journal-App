//Create a global variable to handle the received data from the server
let newData={}

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
    .then(async (response) => {
      newData = await response.json()
    })
    .catch((error) => {
      // appropriately handle the error
      console.log("error", error);
    })
};


export {
  postData,
  newData
}