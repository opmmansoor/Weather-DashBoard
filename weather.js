const API_KEY = "b53f3f448d82edfcd171b747c8f062df";
const URL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric"


let searchBox = document.getElementById("search-input");
let searchBtn = document.querySelector(".btn");
//let favourites = document.getElementsByClassName("favorateBtn");
const favoriteBtn = document.querySelector(".favorateBtn");
let favouriteList = document.querySelector(".fav-list")


// Fetch API

async function checkWeather(city = `kerala`) {
 let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`) 
 let data = await response.json();

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°c";
    document.querySelector(".Description").innerHTML = data.weather[0].description;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".feelslike").innerHTML = Math.round(data.main.feels_like) + "°c";
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


//add City to favourite

function addFavourite(city) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(city)) {
        favorites.push(city);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        loadFavorites(); 
    }
}

//Load Favourites
function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favouriteList.innerHTML = "";

    favorites.forEach(city => {
    favouriteList.innerHTML += `
        <div class="favorite-item">
            ${city}
            <button class="fav-delBtn" onclick="removeFavorite('${city}')">
                <img src="del.png" alt="">
            </button>
        </div>
    `;
});
}

loadFavorites();

favoriteBtn.addEventListener("click", () => {
    addFavourite(document.querySelector(".city").innerText);
});

favoriteBtn.addEventListener("click", () => {
    console.log("clicked");
});

//Delete favorite city
function removeFavorite(city) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(
        fav => fav !== city
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    loadFavorites();   // refresh list
}
