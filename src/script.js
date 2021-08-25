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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row p-1 row-cols-1 row-cols-lg-5 g-2 g-lg-3">`;
  let days = ["Wed", "Thur", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    
                <div class="col">
                  <div class="forecast-sub-container rounded px-2 py-3 border shadow-sm">
                    <div class="forecast-dates pb-2 bd-highlight">${day}</div>
                    <div class="row">
                      <div class="col">
                        
                        <div class="day-one-high-low" style="float: center">
                          <span class="day-one-high">72°</span>
                          <span class="day-one-low">| 49°</span>
                        </div>
                        
                      </div>

                      <div class="col">
                      
                        <div style="float: left">
                          <div class="day-one-weather-icon ">
                            <img
                              src="https://ssl.gstatic.com/onebox/weather/64/thunderstorms.png"
                              alt="thunderstorms"
                              width="56"
                            />
                          </div>
                        </div>
                       
                      </div>

                       <span class="d-lg-none col">
                         <ul>
                         <li>Sunrise: 06:28</li>
                         <li>Sunset: 19:54</li>
                         <li>UV Index: 8</li>
                         </ul>
                       </span>
                      
                        <span class="day-one-forecast">
                          Scattered thunderstorms
                        </span>
                      
                    </div>
                  </div>
                </div>
`;
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

displayForecast();
searchCity("New York");
