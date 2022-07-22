function currentTime(timestamp) {
  let now = new Date();
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

function searchWeather(response) {
  let place = document.querySelector("h3");
  place.innerHTML = response.data.name;
  let time = document.querySelector("#time");
  time.innerHTML = currentTime(response.data.dt * 1000);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windspeed = document.querySelector("#windspeed");
  windspeed.innerHTML = Math.round(response.data.wind.speed);
}

function searchPlace(place) {
  let apiKey = "d10172993467acc634527beee963898b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(searchWeather);
}

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

searchPlace("Hong Kong");
