const openWeatherKey = "e8bad4c410a9d1d5dfe77ad8925591ee";
const city = document.querySelector("h1");
const main = document.querySelector("main");
const section = document.querySelector("section");
const preload = document.getElementById("preload");
const footer = document.querySelector("footer");

const preloadAction = () => {
  preload.style.transform = "opacity";
  preload.style.opacity = "0";
  preload.style.transition = "2s";
};
const preloadFontion = () => {
  window.addEventListener("load", () => {
    setTimeout(preloadAction, 5000);
  });
};
preloadFontion();

//recuperer date du jour
let date1 = new Date();
let dateLocale = date1.toLocaleString("fr-FR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

//fonction recuperation API
const getData = async (coord1, coord2) => {
  const urlToFetch = `https://api.openweathermap.org/data/2.5/weather?lat=${coord1}&lon=${coord2}&units=metric&appid=${openWeatherKey}`;
  try {
    const res = await fetch(urlToFetch);
    if (res.ok) {
      const jsonRes = await res.json();
      console.log(jsonRes);
      main.innerHTML = `<div class='general'><h1>${
        jsonRes.name
      }</h1><h2>${dateLocale}</h2></div><div class='infoMeteo'><div class='infoG'><h2>${
        jsonRes.weather[0].description
      }</h2><h2>${
        jsonRes.main.temp
      }°C</h2></div><div class='infoD'><h2>Humidité : ${
        jsonRes.main.humidity
      }%</h2><h2>Vent : ${Math.round(
        jsonRes.wind.speed * 3.495
      )} km/h</h2></div></div>`;
      return jsonRes;
    }
    throw new Error("Request failed!");
  } catch (error) {
    console.log(error);
  }
};

//fonction de rappel pour recuperer coordonnées
function maPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getData(lat, lon);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(maPosition);
}
