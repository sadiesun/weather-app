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
  celsiusTemperature= response.data.main.temp;
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  let iconElement=document.querySelector("#current-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);

}

function displayForecast (response){
  console.log(response.data.daily);
  let forecastElement=document.querySelector("#forecast")
  let days=["Sun","Mon","Tues","Wed","Thu","Fri"];
  
let forecastHTML= `<div class="row">`;
days.forEach(function(day) {
forecastHTML= forecastHTML +

`<div class="col-2 day">
<div class="weather-forecast-date">${day}</div>
  <div class="card border-info mb-3" style="width: 7rem">
      <div class="card-body" id="sixday">
        <img
      src="http://openweathermap.org/img/wn/10d@2x.png"
      alt=""
      width="75" />
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max"> 18° </span>
      <span class="weather-forecast-temperature-min"> 12° </span>
    </div>
      </div>
  </div>
</div>
`;
});
forecastHTML= forecastHTML + `</div>`;
forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates){
console.log(coordinates);
let apiKey= "b4f2234053365d7dcbed82a7cae1d5ac";
let apiURL= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
console.log(apiURL);
axios.get(apiURL).then(displayForecast);
}

function showFarenheitTemperature(event) {
  event.preventDefault();
  let farenheitTemperature= (celsiusTemperature * 9)/5 + 32;
let temperatureElement=document.querySelector("#temperature");
farenheitConversion.classList.add("active");
celsiusConversion.classList.remove("active");
temperatureElement.innerHTML=Math.round(farenheitTemperature);

}
function showCelsius(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature");
  celsiusConversion.classList.add("active");
  farenheitConversion.classList.remove("active");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

let celsiusTemperature= null;
let celsiusConversion=document.querySelector("#celsius");
celsiusConversion.addEventListener("click",showCelsius);

let farenheitConversion=document.querySelector("#farenheit");
farenheitConversion.addEventListener("click",showFarenheitTemperature);

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

