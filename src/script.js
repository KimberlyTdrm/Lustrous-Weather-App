function formatTime(time) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let now = new Date();

let date = now.getDate();

let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let currentTime = new Date();
currentTime = document.querySelector("span#current-time");

currentTime.innerHTML = formatTime(currentTime);

let todaysDate = document.querySelector("#todays-date");
todaysDate.innerHTML = `${month} ${date}, ${year}`;
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${day}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row p-1 row-cols-1 row-cols-lg-5 g-2 g-lg-3">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    
                <div class="col">
                  <div class="sub-container daily-forecast px-2 py-3 rounded">

                    <div class="forecast-dates pb-2 bd-highlight">${formatDay(
                      forecastDay.dt
                    )}</div>

                    <div class="row">

                    
                      <div class="col-6 forecast-breakpoint">
                        <div class="day-one-high-low">
                          <span class="day-one-high">${Math.round(
                            forecastDay.temp.max
                          )}°</span>
                          <div class="day-one-low">| ${Math.round(
                            forecastDay.temp.min
                          )}°</div>
                        </div>
                      </div>
                      

                      <div class="col-2 icon-breakpoint">
                        <div style="float: left">
                          <div class="day-one-weather-icon">
                            <img
                              src="http://openweathermap.org/img/wn/${
                                forecastDay.weather[0].icon
                              }@2x.png"
                              alt=""
                              width="56"
                            />
                          </div>
                        </div>
                      </div>

                        <span class="col-3 d-lg-none w-25 list-breakpoint">
                          <ul>
                            <li>Sunrise: ${formatTime(forecastDay.sunrise)}</li>
                            <li>Sunset: ${formatTime(forecastDay.sunset)}</li>
                            <li>UV Index: ${Math.round(forecastDay.uvi)}</li>
                          </ul>
                        </span>

                     
                        <div class="c d-lg-none w-25">
                          <div class="day-one-forecast text-capitalize">
                           ${forecastDay.weather[0].description}
                          </div>
                        </div>

                       <div class="row d-none d-lg-block">
                        <div class="day-one-forecast text-capitalize">
                         ${forecastDay.weather[0].description}
                        </div>
                       </div>

                    </div>

                  </div>
                </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCurrentWeather(response) {
  console.log(response);
  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );
  currentWeatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
  fahrenheitTemperature = response.data.main.temp;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-country").innerHTML =
    response.data.sys.country;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  if (response.data.rain === undefined) {
    document.querySelector("#precipitation").innerHTML = 0;
  } else {
    document.querySelector("#precipitation").innerHTML =
      response.data.rain["1h"];
  }
  document.querySelector("#todays-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#todays-low").innerHTML = Math.round(
    response.data.main.temp_min
  );

  summonFiveDayForecast(response.data.coord);
}

function fetchPosition(position) {
  let apiKey = "0bcd7ddcb27e38fd12ad8e86572870d2";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function getGps(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(fetchPosition);
}

function summonFiveDayForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0bcd7ddcb27e38fd12ad8e86572870d2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall?";
  let units = "imperial";
  let apiUrl = `${apiEndpoint}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherEnvironment(response) {
  console.log(response);
  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );
  currentWeatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentWeatherIconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
  fahrenheitTemperature = response.data.main.temp;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-country").innerHTML =
    response.data.sys.country;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  if (response.data.rain === undefined) {
    document.querySelector("#precipitation").innerHTML = 0;
  } else {
    document.querySelector("#precipitation").innerHTML =
      response.data.rain["1h"];
  }
  document.querySelector("#todays-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#todays-low").innerHTML = Math.round(
    response.data.main.temp_min
  );

  summonFiveDayForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "0bcd7ddcb27e38fd12ad8e86572870d2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "imperial";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherEnvironment);
}

function exploreMetropolis(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let fahrenheitTemperature = null;

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getGps);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", exploreMetropolis);

searchCity("New York");
