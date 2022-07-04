import "./style.css";
import { GetWeather } from "./WeatherAPI";

const form = document.getElementById("form");
const curWeatherImg = document.getElementById("currentweatherimg");
const cityText = document.getElementById("city");
const curTempText = document.getElementById("currenttemp");
const curWeatherDesc = document.getElementById("weathertype");
const curTime = document.getElementById("time");

let celsius = true;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  setWeatherInfo(event.target[0].value);
});

async function setWeatherInfo(city) {
  const weatherData = await GetWeather(city);

  curWeatherImg.src = `https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`;
  cityText.textContent = weatherData.location;
  curTempText.textContent = convertUnits(weatherData.temperature);
  curWeatherDesc.textContent = weatherData.description;
  curTime.textContent = weatherData.date;
}

// GetWeather("London");

function convertUnits(temp) {
  // Fahrenheit:  9/5(K - 273.15) + 32
  // Celsius: °C=K−273.15
  let convertedTemp;
  if (celsius) {
    convertedTemp = temp - 273.15;
    convertedTemp = Math.round(convertedTemp * 10) / 10;
    convertedTemp += " °C";
  } else {
    convertedTemp = 1.8 * (temp - 273.15) + 32;
    convertedTemp = Math.round(convertedTemp * 10) / 10;
    convertedTemp += " °F";
  }

  return convertedTemp;
}
