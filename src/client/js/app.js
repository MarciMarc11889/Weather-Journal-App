
// Function after clicking on "Submit". Eventlistener on HTML-side
async function performAction(e) {
  const APIdata = {
    destination: document.getElementById("dest").value,
    date: document.getElementById("date").value
  }
  console.log(APIdata)
  await Client.postData("//localhost:3000/data", APIdata)
  .then(() =>{
    const receivedData = Client.newData
    return receivedData
  })
  .then((receivedData) => {
    console.log(receivedData.picURL)
    console.log(receivedData)
    const existingPic  = document.getElementById("pic")
    if (existingPic.hasChildNodes()) {
      document.getElementById("picture").remove()
      document.getElementById("icon").remove()
    }
    const pic = document.createElement("IMG")
    pic.setAttribute("src", receivedData.picURL)
    pic.setAttribute("id", "picture")
    pic.setAttribute("alt", "Picture of city")
    document.getElementById("pic").appendChild(pic)

    const icon = document.createElement("IMG")
    icon.setAttribute("src", receivedData.iconURL)
    icon.setAttribute("id", "icon")
    icon.setAttribute("alt", "Icon")
    document.getElementById("icon").appendChild(icon)

    document.getElementById("weather").innerHTML  = receivedData.description

    document.getElementById("temp").innerHTML     = `Temperature: ${receivedData.temp} °C`

  })
}

export { performAction }