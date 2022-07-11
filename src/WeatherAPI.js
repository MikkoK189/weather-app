import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";
import { addDays, compareAsc, isEqual, isToday, parseISO } from "date-fns";

const key = "2064d0a9d778095e3bf01bf1214f9eb3";

class WeatherData {
  constructor(
    location = "Failed to find",
    temperature = "°C",
    icon = "01d",
    description = "Please try again",
    time = format(new Date(0, 0, 1), "HH:mm, EEEE"),
    date = format(new Date(0, 0, 1), "do 'of' MMMM y")
  ) {
    this.location = location;
    this.temperature = temperature;
    this.icon = icon;
    this.description = description;
    this.time = time;
    this.date = date;
  }
}

// Tries to call the weather from openweathermap API
async function GetWeather(location) {
  try {
    const coordInfo = await getCoordinates(location);
    const weatherInfo = await getForecast(
      coordInfo.coord.lat,
      coordInfo.coord.lon
    );

    return [weatherInfo, coordInfo];
  } catch (err) {
    console.error(err);
    return new WeatherData();
  }
}

async function getCoordinates(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
  );
  const coordInfo = await response.json();

  return coordInfo;
}

async function getForecast(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lon=${lon}&lat=${lat}&appid=${key}&exclude=minutely,alerts,hourly`
  );
  const weatherInfo = await response.json();

  return weatherInfo;
}

function parseWeather(data, cityName) {
  const weatherData = new WeatherData();
  weatherData.location = cityName;
  weatherData.temperature = data.temp;
  weatherData.icon = data.weather[0].icon;
  weatherData.description = data.weather[0].description;
  weatherData.time = format(fromUnixTime(data.dt), "HH:mm, EEEE");
  weatherData.date = format(fromUnixTime(data.dt), "do 'of' MMMM y");
  return weatherData;
}

export { GetWeather, parseWeather };
