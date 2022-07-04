import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";

const key = "2064d0a9d778095e3bf01bf1214f9eb3";
const defaultData = {
  location: "Failed to find",
  temperature: "°C",
  icon: "01d",
  description: "Please try again",
  date: format(new Date(0, 0, 1), "HH:mm, EEEE do 'of' MMMM y"),
};

// Tries to call the weather from openweathermap API
async function GetWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
    );

    const weatherInfo = await response.json();

    return parseWeather(weatherInfo);
  } catch (err) {
    console.error(err);
    return defaultData;
  }
}

function parseWeather(data) {
  const weatherData = {
    location: data.name,
    temperature: data.main.temp,
    icon: data.weather[0].icon,
    description: data.weather[0].description,
    date: format(fromUnixTime(data.dt), "HH:mm, EEEE do 'of' MMMM y"),
  };
  console.log(weatherData);
  return weatherData;
}

export { GetWeather };
