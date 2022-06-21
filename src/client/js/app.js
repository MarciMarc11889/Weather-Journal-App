
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();



// Function after clicking on "Submit". Eventlistener on HTML-side
async function performAction(e) {
  const APIdata = {
    destination: document.getElementById("dest").value,
    date: document.getElementById("date").value
  }
  console.log(APIdata)
  await Client.postData("//localhost:3000/data", APIdata)
  .then(() =>{
    const pic = Client.newData
    console.log(pic.picture)
    return pic
  })
  .then(async (pic) => {
    console.log(pic.picture)
    let x = document.createElement("IMG")
    x.setAttribute("src", pic.picture)
    x.setAttribute("width", "304")
    x.setAttribute("height", "228")
    x.setAttribute("id", "picutre")
    x.setAttribute("alt", "Picture of city")
  document.body.appendChild(x)
  })
}

export { performAction }