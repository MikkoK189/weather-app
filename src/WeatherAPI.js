import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";
import { compareAsc, isEqual, isToday, parseISO } from "date-fns";

const key = "2064d0a9d778095e3bf01bf1214f9eb3";
function WeatherData(location, temperature, icon, description, time, date) {
  this.location = "Failed to find";
  this.temperature = "°C";
  this.icon = "01d";
  this.description = "Please try again";
  this.time = format(new Date(0, 0, 1), "HH:mm, EEEE");
  this.date = format(new Date(0, 0, 1), "HH:mm, EEEE do 'of' MMMM y");
}

const DayWeather = {
  mintemp: "0",
  maxtemp: "30",
};

// Tries to call the weather from openweathermap API
async function GetWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
    );

    const weatherInfo = await response.json();
    getForecast(location);
    return parseWeather(weatherInfo);
  } catch (err) {
    console.error(err);
    return new WeatherData();
  }
}

async function getForecast(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}`
  );

  const weatherInfo = await response.json();

  const weatherExceptToday = weatherInfo.list.filter(
    (item) => !isToday(parseISO(item.dt_txt))
  );

  console.log(weatherExceptToday);

  console.log(weatherInfo);
}

function compareDates(dateToCompare, dateComparedTo) {
  return isEqual(dateToCompare, dateComparedTo);
}

function parseWeather(data) {
  const weatherData = new WeatherData();
  weatherData.location = data.name;
  weatherData.temperature = data.main.temp;
  weatherData.icon = data.weather[0].icon;
  weatherData.description = data.weather[0].description;
  weatherData.time = format(fromUnixTime(data.dt), "HH:mm, EEEE");
  weatherData.date = format(fromUnixTime(data.dt), "do 'of' MMMM y");
  return weatherData;
}

export { GetWeather };
