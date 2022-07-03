import "./style.css";
import { GetWeather } from "./WeatherAPI";

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  GetWeather(event.target[0].value);
});

GetWeather("a");

function convertUnits() {
  //Fahrenheit:  9/5(K - 273.15) + 32
  //Celsius: °C=K−273.15
}
