const url = "https://api.openweathermap.org/data/2.5/weather?q="
const apikey = "&appid=6a26eb1c023b34b6a231d044193add0c";
const unit = "&units=metric" 

let input = document.querySelector(".search input");
let searchBtn = document.querySelector(".search-btn"); 
let values = document.querySelector(".values");
let search = document.querySelector(".search");

searchBtn.addEventListener("click", ()=>{
    const city = input.value;
    checkWeather(city);
});

input.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        const city = input.value;
        checkWeather(city);
    }
});
async function checkWeather(city){
    const URL = url+city+apikey+unit;
    const response = await fetch(URL);
    const data = await response.json();
    if(data.cod === 200){
        values.style.display = "block";
        search.style.borderBottomLeftRadius = "0rem";
        search.style.borderBottomRightRadius = "0rem";

        const temp = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed * 3.6);
        const description = data.weather[0].main;
        const cityName = data.name;
        const country = data.sys.country;
        const feelsLike = Math.round(data.main.feels_like);

        values.innerHTML = `
            <div class="weather-container">
                <div class="city-info">
                    <h2>${cityName}, ${country}</h2>
                    <p class="description">${description}</p>
                </div>
                <div class="temp-display">
                    <div class="temp-main">${temp}°C</div>
                    <div class="feels-like">Feels like ${feelsLike}°C</div>
                </div>
                <div class="weather-details">
                    <div class="detail-card">
                        <i class="fas fa-droplet"></i>
                        <div class="detail-info">
                            <p>Humidity</p>
                            <h4>${humidity}%</h4>
                        </div>
                    </div>
                    <div class="detail-card">
                        <i class="fas fa-wind"></i>
                        <div class="detail-info">
                            <p>Wind Speed</p>
                            <h4>${windSpeed} km/h</h4>
                        </div>
                    </div>
                </div>
            </div>
        `; 
    }
    else if(data.cod === "404"){
        values.style.display = "block";
        search.style.borderBottomLeftRadius = "0rem";
        search.style.borderBottomRightRadius = "0rem";
        values.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-circle"></i> Enter Valid city Name.</div>`;
    }
    else{
        values.style.display = "block";
        search.style.borderBottomLeftRadius = "0rem";
        search.style.borderBottomRightRadius = "0rem";
        values.innerHTML = `<div class="error-message"><i class="fas fa-info-circle"></i> Enter City Name.</div>`;
    }
}