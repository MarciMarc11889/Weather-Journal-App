
// Function after clicking on "Submit". Eventlistener on HTML-side
async function performAction(e) {
  const APIdata = {
    //Get the entered values of the user
    destination: document.getElementById("dest").value,
    date: document.getElementById("date").value
  }
  console.log(APIdata)
  //Post data to express server
  await Client.postData("//localhost:3000/data", APIdata)
  //Hand over received data to own variable
  .then(() =>{
    const receivedData = Client.newData
    return receivedData
  })
  //Add DOM elements
  .then((receivedData) => {
    //Check the received data on console
    console.log(receivedData)

    //Check if there is already a result and delete it
    const existingPic  = document.getElementById("pic")
    if (existingPic.hasChildNodes()) {
      document.getElementById("picture").remove()
      document.getElementById("icon").remove()
    }

    //Add the Picture to Result
    const pic = document.createElement("IMG")
    pic.setAttribute("src", receivedData.picURL)
    pic.setAttribute("id", "picture")
    pic.setAttribute("alt", "Picture of city")
    document.getElementById("pic").appendChild(pic)

    //Add the weather icon to the result
    const icon = document.createElement("IMG")
    icon.setAttribute("src", receivedData.iconURL)
    icon.setAttribute("id", "icon")
    icon.setAttribute("alt", "Icon")
    document.getElementById("ic").appendChild(icon)

    //Add all the weather data as string to the result
    document.getElementById("weather").innerHTML    =  receivedData.description
    document.getElementById("rdate").innerHTML  =  receivedData.datetime.slice(0,10) 
    document.getElementById("temp").innerHTML     = `Temperature: ${receivedData.temp} °C`

  })
}

export { performAction }