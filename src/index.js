function currentTime(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentDay} ${currentHour}:${currentMinute}`;
}

function formatDay(timestamp) {
  let forecastDay = new Date(timestamp * 1000);
  let day = forecastDay.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
        <div class="forecastDay">${formatDay(forecastDay.dt)}</div>
        <img
          src=
          "https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt=""/>
        <div class="forecastTemp">
        <span class="forecastMinTemp">${Math.round(
          forecastDay.temp.min
        )} | </span>
          <span class="forecastMaxTemp">${Math.round(
            forecastDay.temp.max
          )}°C</span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "d10172993467acc634527beee963898b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function searchWeather(response) {
  let place = document.querySelector("h3");
  place.innerHTML = response.data.name;
  let time = document.querySelector("#time");
  time.innerHTML = currentTime(response.data.dt * 1000);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windspeed = document.querySelector("#windspeed");
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  let minTemp = document.querySelector("#minTemp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  let maxTemp = document.querySelector("#maxTemp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let temperature = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemperature);
  let weatherIcon = document.querySelector("#currentWeatherIcon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchPlace(place) {
  let apiKey = "d10172993467acc634527beee963898b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(searchWeather);
}
let fillForm = document.querySelector("#searchForm");
fillForm.addEventListener("submit", submitSearch);

function submitSearch(event) {
  event.preventDefault();
  let placeInput = document.querySelector("#placeInput");
  searchPlace(placeInput.value);
}

function locatePosition(position) {
  let apiKey = "d10172993467acc634527beee963898b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(searchWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locatePosition);
}
let showTemp = document.querySelector("#currentLocationButton");
showTemp.addEventListener("click", currentLocation);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#degreeF");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celsius = document.querySelector("#degreeC");
celsius.addEventListener("click", showCelsiusTemp);

searchPlace("Hong Kong");
