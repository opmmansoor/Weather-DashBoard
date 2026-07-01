const API_KEY = "b53f3f448d82edfcd171b747c8f062df";
const URL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric"


let searchBox = document.getElementById("search-input")
let searchBtn = document.querySelector(".btn")



// Fetch API

async function checkWeather(city = `kerala`) {
 let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`) 
 let data = await response.json();

    document.querySelector(".city").innerHTML  = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML  = data.wind.speed + "Km/h";
}


//Search button
searchBtn.addEventListener("click",() =>{
    checkWeather(searchBox.value)
})

searchBox.addEventListener("keyup",(e) => {
    if (e.key == "Enter"){
        checkWeather(searchBox.value)
    }
})
checkWeather();