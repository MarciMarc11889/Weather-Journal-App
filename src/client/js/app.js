
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();



// Function after clicking on "Generate". Eventlistener on HTML-side
function performAction(e) {
  const APIdata = {
    destination: document.getElementById("dest").value,
    date: document.getElementById("date").value
  }
  console.log(APIdata)
  Client.postData("//localhost:3000/data", APIdata)
}

export { performAction }