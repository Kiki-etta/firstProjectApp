function formatDate(date) {
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
    "Novemeber",
    "Decemember",
  ];

  let year = now.getFullYear();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let currentDate = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day},${hours}:${minutes} ${month} ${currentDate}, ${year} `;
}

let updatedToday = document.querySelector("#day-time");
updatedToday.innerHTML = formatDate();

function submitForm(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let city = document.querySelector("#location");
  city.innerHTML = `${input.value}`;
}

let enterCity = document.querySelector("#search-city");
enterCity.addEventListener("submit", submitForm);

function displayWeatherCondition(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML =
    Math.round(response.data.main.temp) + "C°";
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed) + `km/h`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity + "% ";
}
function searchCity(city) {
  let apiKey = "484f3d6f06753ea5697d7e6e574f9419";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "484f3d6f06753ea5697d7e6e574f9419";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Amsterdam");
