//Set Date Selector to min=0 Days and max= +16 days

const setDateLimits = () => {
let getDate         = new Date(),
    year            = getDate.getFullYear(),
    month           = getDate.getMonth(),
    day             = getDate.getDate(),
    futureDate      = new Date(year,month,day +15),
    futureYear      = futureDate.getFullYear(),
    futureDay       = futureDate.getDate(),
    futureMonth     = futureDate.getMonth(),
    today           = `${year}-0${month + 1}-${day}`,
    future          = `${futureYear}-0${futureMonth + 1}-${futureDay}`

const date = document.getElementById('date')
date.setAttribute("min", today)
date.setAttribute("max", future)
date.setAttribute("value", today)
}

export {setDateLimits}