import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";

const key = "2064d0a9d778095e3bf01bf1214f9eb3";

// Tries to call the weather from openweathermap API
async function GetWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
    );

    const weatherInfo = await response.json();

    return parseWeather(weatherInfo);
  } catch (err) {
    alert(err);
    return;
  }
}

function parseWeather(data) {
  // Format the weather description text to upper case
  let weatherDesc = data.weather[0].description.split(" ");

  for (let i = 0; i < weatherDesc.length; i++) {
    weatherDesc[i] = weatherDesc[i][0].toUpperCase() + weatherDesc[i].substr(1);
  }

  weatherDesc = weatherDesc.join(" ");

  const weatherData = {
    location: data.name,
    temperature: data.main.temp,
    icon: data.weather[0].icon,
    description: weatherDesc,
    date: format(fromUnixTime(data.dt), "H:mm, EEEE do 'of' MMMM y"),
  };
  console.log(weatherData);
  return weatherData;
}

export { GetWeather };
