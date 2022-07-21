let now = new Date();
let h4 = document.querySelector("#time");
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
h4.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

function searchTemperature(response) {
  let place = document.querySelector("h3");
  place.innerHTML = response.data.name;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);
}

function searchPlace(event) {
  let apiKey = "d10172993467acc634527beee963898b";
  let placeInput = document.querySelector("#searchPlace").value;
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${placeInput}&units=metric&appid=${apiKey}`;
  axios.get(apiurl).then(searchTemperature);
}
let fillForm = document.querySelector("#searchForm");
fillForm.addEventListener("submit", searchPlace);

function locatePosition(position) {
  let apiKey = "d10172993467acc634527beee963898b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(searchTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locatePosition);
}
let showTemp = document.querySelector("#currentLocationButton");
showTemp.addEventListener("click", currentLocation);
