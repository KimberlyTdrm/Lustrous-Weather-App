function formatTime() {
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
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

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

function formatSunriseSunset(sec) {
  var date = new Date(sec * 1000);
  var timestr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return timestr;
}

function formatSunriseSunsetGB(sec) {
  var date = new Date(sec * 1000);
  var timestr = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return timestr;
}

function formatCurrentTime(sec) {
  var date = new Date(sec * 1000);
  var timestr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return timestr;
}

function formatCurrentTimeGB(sec) {
  var date = new Date(sec * 1000);

  var timestr = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return timestr;
}

function displayForecast(response) {
  let popElement = document.querySelector("#todays-pop");
  let popPercentElement = Math.round(response.data.daily[0].pop * 100);
  popElement.innerHTML = `Chance of Precipitation: ${popPercentElement}%`;

  let uviElement = document.querySelector("#todays-uvi");
  uviElement.innerHTML = `UV Index: ${Math.round(response.data.current.uvi)}`;

  let sunriseElement = document.querySelector("#todays-sunrise");
  let sunsetElement = document.querySelector("#todays-sunset");
  let currentTimeElement = document.querySelector("span#current-time");
  if (element.classList.contains("active")) {
    currentTimeElement.innerHTML = `${formatCurrentTimeGB(
      response.data.current.dt
    )}`;
  } else {
    currentTimeElement.innerHTML = `${formatCurrentTime(
      response.data.current.dt
    )}`;
  }

  if (element.classList.contains("active")) {
    sunriseElement.innerHTML = `Sunrise: ${formatSunriseSunsetGB(
      response.data.current.sunrise
    )}`;
  } else {
    sunriseElement.innerHTML = `Sunrise: ${formatSunriseSunset(
      response.data.current.sunrise
    )}
   `;
  }

  if (element.classList.contains("active")) {
    sunsetElement.innerHTML = `Sunset: ${formatSunriseSunsetGB(
      response.data.current.sunset
    )}`;
  } else {
    sunsetElement.innerHTML = `Sunset: ${formatSunriseSunset(
      response.data.current.sunset
    )}`;
  }

  console.log(response);

  let forecastElement = document.querySelector("#forecast");

  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row p-1 row-cols-1 row-cols-lg-5 g-2 g-lg-3">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    
               <div class="col d-lg-flex">
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
                          <div class="day-one-low">|${Math.round(
                            forecastDay.temp.min
                          )}°</div>
                        </div>
                      </div>
                      

                      <div class="col-2 icon-breakpoint">
                       
                          <div class="day-one-weather-icon">
                            <img
                              src="images/${forecastDay.weather[0].icon}.svg"
                              alt=""
                              width="56"
                            />
                          </div>
                        
                      </div>

                        <span class="col-3 d-lg-none w-25 list-breakpoint">
                          <ul>
                            <li>UV Index: ${Math.round(forecastDay.uvi)}</li>
                            <li>Humidity: ${forecastDay.humidity}%</li>
                          </ul>
                        </span>

                        <span class="col-3 d-lg-none w-25 list-breakpoint">
                          <ul>
                            <li>Cloudiness: ${forecastDay.clouds}%</li>
                            <li>Precip: ${Math.round(
                              forecastDay.pop * 100
                            )}%</li>

                          </ul>
                        </span>

                     
                        <div class="text-center col d-lg-none w-25">
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

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function aquireDailyInMetric(response) {
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiUrl = `${apiEndpoint}lat=${response.lat}&lon=${response.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function aquireDailyInImperial(response) {
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiUrl = `${apiEndpoint}lat=${response.lat}&lon=${response.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function exchangeUnits(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let feelsLike = document.querySelector("#feels-like");
  let windSpeed = document.querySelector("#wind");
  let todaysHigh = document.querySelector("#todays-high");
  let todaysLow = document.querySelector("#todays-low");
  let temperature = response.data.main.temp;

  let sunriseElement = document.querySelector("#todays-sunrise");

  let sunsetElement = document.querySelector("#todays-sunset");

  todaysHigh.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  todaysLow.innerHTML = `|${Math.round(response.data.main.temp_min)}°`;

  currentTemperature.innerHTML = Math.round(temperature);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);

  if (element.classList.contains("active")) {
    windSpeed.innerHTML = `${Math.round(
      (response.data.wind.speed * 18) / 5
    )} km/h`;

    aquireDailyInMetric(response.data.coord);
  } else {
    windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mph`;

    aquireDailyInImperial(response.data.coord);
  }

  if (element.classList.contains("active")) {
    sunriseElement.innerHTML = `Sunrise: ${formatSunriseSunsetGB(
      response.data.sys.sunrise
    )}`;
  } else {
    sunriseElement.innerHTML = `Sunrise:${formatSunriseSunset(
      response.data.sys.sunrise
    )}
   `;
  }

  if (element.classList.contains("active")) {
    sunsetElement.innerHTML = `Sunset: ${formatSunriseSunsetGB(
      response.data.sys.sunset
    )}`;
  } else {
    sunsetElement.innerHTML = `Sunset: ${formatSunriseSunset(
      response.data.sys.sunset
    )} `;
  }

  if (response.data.rain == undefined) {
    document.querySelector("#precipitation").innerHTML = `Precipitation: 0`;
  } else {
    document.querySelector(
      "#precipitation"
    ).innerHTML = `Precipitation: ${response.data.rain["1h"]}`;
  }
}

function displayMetricUnits(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let units = "metric";

  let cityDisplayed = document.querySelector("#current-city");
  let city = cityDisplayed.innerHTML;

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;

  let displayPrecipitationUnit = document.querySelector("#precipitation-unit");
  displayPrecipitationUnit.innerHTML = ` mm`;

  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureElement.innerHTML = Math.round(celsiusTemperature);

  axios.get(apiUrl).then(exchangeUnits);
}

function displayImperialUnits(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let units = "imperial";

  let cityDisplayed = document.querySelector("#current-city");
  let city = cityDisplayed.innerHTML;
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(exchangeUnits);
}

function showCurrentWeather(response) {
  console.log(response);
  let iconId = response.data.weather[0].icon;
  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );
  currentWeatherIconElement.setAttribute("src", `images/${iconId}.svg`);
  currentWeatherIconElement.setAttribute("width", "100px");
  currentWeatherIconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
  fahrenheitTemperature = response.data.main.temp;
  let displayPrecipitationUnit = document.querySelector("#precipitation-unit");
  displayPrecipitationUnit.innerHTML = ` mm`;
  let sunriseElement = document.querySelector("#todays-sunrise");

  let sunsetElement = document.querySelector("#todays-sunset");
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
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  if (response.data.rain === undefined) {
    document.querySelector("#precipitation").innerHTML = `Precipitation: 0`;
  } else {
    document.querySelector(
      "#precipitation"
    ).innerHTML = `Precipitation: ${response.data.rain["1h"]}`;
  }

  document.querySelector("#todays-high").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;

  document.querySelector("#todays-low").innerHTML = `|${Math.round(
    response.data.main.temp_min
  )}°`;

  if (element.classList.contains("active")) {
    sunriseElement.innerHTML = `Sunrise: ${formatSunriseSunsetGB(
      response.data.sys.sunrise
    )}`;
  } else {
    sunriseElement.innerHTML = `Sunrise: ${formatSunriseSunset(
      response.data.sys.sunrise
    )}
   `;
  }

  if (element.classList.contains("active")) {
    sunsetElement.innerHTML = `Sunset: ${formatSunriseSunsetGB(
      response.data.sys.sunset
    )}`;
  } else {
    sunsetElement.innerHTML = `Sunset: ${formatSunriseSunset(
      response.data.sys.sunset
    )}`;
  }

  summonFiveDayForecast(response.data.coord);
}

function fetchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentWeather);

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function getGps(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(fetchPosition);
}

function summonFiveDayForecast(coordinates) {
  console.log(coordinates);

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall?";

  let apiUrl = `${apiEndpoint}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherEnvironment(response) {
  console.log(response);
  let iconId = response.data.weather[0].icon;
  let currentWeatherIconElement = document.querySelector(
    "#current-weather-icon"
  );
  currentWeatherIconElement.setAttribute("src", `images/${iconId}.svg`);
  currentWeatherIconElement.setAttribute("width", "100px");
  currentWeatherIconElement.setAttribute(
    "alt",
    response.data.weather[0].description
  );
  fahrenheitTemperature = response.data.main.temp;
  let sunriseElement = document.querySelector("#todays-sunrise");

  let sunsetElement = document.querySelector("#todays-sunset");
  let displayPrecipitationUnit = document.querySelector("#precipitation-unit");
  displayPrecipitationUnit.innerHTML = ` mm`;
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
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} mph`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#todays-high").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;

  document.querySelector("#todays-low").innerHTML = `|${Math.round(
    response.data.main.temp_min
  )}°`;

  if (response.data.rain === undefined) {
    document.querySelector("#precipitation").innerHTML = `Precipitation: 0`;
  } else {
    document.querySelector(
      "#precipitation"
    ).innerHTML = `Precipitation: ${response.data.rain["1h"]}`;
  }

  if (element.classList.contains("active")) {
    sunriseElement.innerHTML = `Sunrise: ${formatSunriseSunsetGB(
      response.data.sys.sunrise
    )}`;
  } else {
    sunriseElement.innerHTML = `Sunrise: ${formatSunriseSunset(
      response.data.sys.sunrise
    )}
   `;
  }

  if (element.classList.contains("active")) {
    sunsetElement.innerHTML = `Sunset: ${formatSunriseSunsetGB(
      response.data.sys.sunset
    )}`;
  } else {
    sunsetElement.innerHTML = `Sunset: ${formatSunriseSunset(
      response.data.sys.sunset
    )}`;
  }

  summonFiveDayForecast(response.data.coord);
}

function searchCity(city) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherEnvironment);

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function exploreMetropolis(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let fahrenheitTemperature = null;

let apiKey = "0bcd7ddcb27e38fd12ad8e86572870d2";

let units = "imperial";

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getGps);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayMetricUnits);

let element = document.querySelector("#celsius-link");

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayImperialUnits);

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", exploreMetropolis);

searchCity("New York");
