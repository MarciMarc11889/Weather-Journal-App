
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
    return pic
  })
  .then((pic) => {
    console.log(pic.picture)
    const existingPic  = document.getElementById("pic")
    if (existingPic.hasChildNodes()) {
      document.getElementById("picture").remove()
    }
    const x = document.createElement("IMG")
    x.setAttribute("src", pic.picture)
    x.setAttribute("id", "picture")
    x.setAttribute("alt", "Picture of city")
    document.getElementById("pic").appendChild(x)
  })
}

export { performAction }