const key = "2064d0a9d778095e3bf01bf1214f9eb3";

// Tries to call the weather from openweathermap API
async function GetWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
    );

    const weatherInfo = await response.json();
    console.log(weatherInfo);

    return parseWeather(weatherInfo);
  } catch (err) {
    alert(err);
    return;
  }
}

function parseWeather(data) {
  const weatherData = {
    location: data.name,
    temperature: data.main.temp,
    icon: data.weather[0].icon,
    description: data.weather[0].description,
  };
  return weatherData;
}

export { GetWeather };
