import "./style.css";
import { GetWeather } from "./WeatherAPI";

const form = document.getElementById("form");
const curWeatherImg = document.getElementById("currentweatherimg");
const cityText = document.getElementById("city");
const curTempText = document.getElementById("currenttemp");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  setWeatherInfo(event.target[0].value);
});

async function setWeatherInfo(city) {
  const weatherData = await GetWeather(city);
  console.log("WATTAFUG");
  console.log(weatherData);

  curWeatherImg.src = `https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`;
  cityText.textContent = weatherData.location;
  curTempText.textContent = weatherData.temperature;
}

// GetWeather("London");

function convertUnits() {
  // Fahrenheit:  9/5(K - 273.15) + 32
  // Celsius: °C=K−273.15
}
