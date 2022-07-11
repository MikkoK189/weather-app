import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";
import { addDays, compareAsc, isEqual, isToday, parseISO } from "date-fns";

const key = "2064d0a9d778095e3bf01bf1214f9eb3";
const weathersByDays = [];

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

function DayWeather(day, mintemp, maxtemp) {
  this.day = "Monday";
  this.mintemp = "0";
  this.maxtemp = "30";
}

async function getCoordinates(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
  );
  const coordInfo = await response.json();

  return coordInfo;
}

// Tries to call the weather from openweathermap API
async function GetWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
    );
    const weatherInfo = await response.json();
    // getForecast(location);
    getForecast();
    return parseWeather(weatherInfo);
  } catch (err) {
    console.error(err);
    return new WeatherData();
  }
}

async function getForecast() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lon=23.0167&lat=62.0167&appid=2064d0a9d778095e3bf01bf1214f9eb3&exclude=minutely,alerts,hourly`
  );
  const weatherInfo = await response.json();

  console.log(weatherInfo);
}

// async function getForecast(location) {
//   const response = await fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}`
//   );

//   const weatherInfo = await response.json();

//   const weatherExceptToday = weatherInfo.list.filter(
//     (item) => !isToday(parseISO(item.dt_txt))
//   );

//   // Want to go through the array and separate weathers for each day into their own arrays from which to find min and max temp for each day.
//   for (let i = 0; i < 5; i++) {
//     // console.log(addDays(new Date(), i + 1));
//     let weatherDay = weatherExceptToday.filter(function (item) {
//       // console.log(parseISO(item.dt_txt));
//       let dayToCompare = addDays(new Date(), i + 1);
//       dayToCompare.setHours(0, 0, 0, 0);

//       let testDay = parseISO(item.dt_txt);
//       testDay.setHours(0, 0, 0, 0);

//       if (compareAsc(dayToCompare, testDay) == 0) {
//         return true;
//       }
//       return false;
//     });
//     weathersByDays.push(weatherDay);
//     console.log(weathersByDays);
//   }
//   // Gets max temp from the day's temperatures!!
//   const maxTemp = weathersByDays[0].reduce((previous, current) => {
//     if (current.main.temp > previous) return current.main.temp;
//     return previous;
//   }, 0);
//   console.log(maxTemp);
//   console.log(Math.max(weathersByDays[0][0].main.temp));
// }

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
