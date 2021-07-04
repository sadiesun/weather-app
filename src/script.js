let now = new Date();
function getCurrentTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  return `${day} , ${hour}:${minutes}`;
}
let dayTime = document.querySelector("#day-time");
dayTime.innerHTML = getCurrentTime(now);

function displayWeather(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed}`;
  document.querySelector(
    "#humid"
  ).innerHTML = `Humidity: ${response.data.main.humidity}`;
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  let iconElement=document.querySelector("#current-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);


}

function searchCity(city) {
  let apiKey = "b4f2234053365d7dcbed82a7cae1d5ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentCity);

function searchLocation(position) {
  let apiKey = "b4f2234053365d7dcbed82a7cae1d5ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
