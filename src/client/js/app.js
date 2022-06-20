
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// Listen to "Generate" Button
// document.getElementById("submit").addEventListener("click", performAction);

// Function after clicking on "Generate"
function performAction(e) {
  const APIdata = {
    destination: document.getElementById("dest").value,
    date: document.getElementById("date").value
  }
  console.log(APIdata)
  postData("//localhost:3000/data", APIdata)


}
/* Function to POST data */
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
    .then(async () => {
      const newData = await response.json()
      console.log(newData)
    })
    .catch((error) => {
      // appropriately handle the error
      console.log("error", error);
    })
};


// // retrieve data from localhost and update UI
// const retrieveData = async () => {
//   const request = await fetch("/all");
//   try {
//     // Transform into JSON
//     const allData = await request.json();
//     console.log(allData);
//     // Write updated data to DOM elements
//     document.getElementById("temp").innerHTML =
//       Math.round(allData.temp) + " degrees";
//     document.getElementById("temp").classList = "fade";
//     document.getElementById("content").innerHTML = allData.feel;
//     document.getElementById("content").classList = "fade";
//     document.getElementById("date").innerHTML = allData.date;
//     document.getElementById("date").classList = "fade";
//   } catch (error) {
//     console.log("error", error);
//     // appropriately handle the error
//   }
// };

export { performAction }