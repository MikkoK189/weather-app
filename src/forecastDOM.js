import { format, fromUnixTime } from "date-fns";
import { convertUnits } from ".";

const template = document.getElementById(0);
const container = document.getElementById("cardcont");

function displayForecast(data) {
  const dataWithoutToday = data.daily.slice(1);
  dataWithoutToday.forEach((weatherDay) => {
    const newCard = template.cloneNode(true);
    const dateElement = newCard.querySelector("#date");
    dateElement.textContent = format(fromUnixTime(weatherDay.dt), "EEEE");
    const imgElement = newCard.querySelector("#smallimg");
    imgElement.src = `https://openweathermap.org/img/wn/${weatherDay.weather[0].icon}@4x.png`;
    const maxElement = newCard.querySelector("#maxtemp");
    maxElement.textContent = `Max: ${convertUnits(weatherDay.temp.max)}`;
    const minElement = newCard.querySelector("#mintemp");
    minElement.textContent = `Min: ${convertUnits(weatherDay.temp.min)}`;

    container.appendChild(newCard);
  });
}

template.parentNode.removeChild(template);

export { displayForecast };
