import { formatRent, formatPopulation, capitalize } from "./format.mjs";
import { getFavorites, toggleFavorite } from "./storage.mjs";
import { getWeather } from "./weather.mjs";

const modal = document.querySelector("#city-modal");
const title = document.querySelector("#modal-title");
const province = document.querySelector("#modal-province");
const facts = document.querySelector("#modal-facts");
const description = document.querySelector("#modal-description");
const weatherBox = document.querySelector("#modal-weather");
const saveButton = document.querySelector("#modal-save");
const closeButton = document.querySelector("#modal-close");

let currentCity = null;
let onChange = () => {};

function updateSaveButton() {
    const saved = getFavorites().includes(currentCity.id);
    saveButton.setAttribute("aria-pressed", String(saved));
    saveButton.textContent = saved ? "Saved to favorites" : "Save to favorites";
}

async function showWeather(city) {
    weatherBox.textContent = "Loading current weather...";
    const weather = await getWeather(city.lat, city.lon);

    if (currentCity !== city) {
        return;
    }

    if (!weather) {
        weatherBox.textContent = "Current weather is not available right now.";
        return;
    }

    weatherBox.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="" width="50" height="50">
        <span><strong>${weather.temp}&deg;C now</strong> in ${city.name}, ${weather.description}</span>
    `;
}

export function openCity(city) {
    currentCity = city;
    title.textContent = city.name;
    province.textContent = city.province;
    description.textContent = city.description;

    facts.innerHTML = `
        <div><dt>Population</dt><dd>${formatPopulation(city.population)}</dd></div>
        <div><dt>Avg. 1-bed rent</dt><dd>${formatRent(city.rent)} per month</dd></div>
        <div><dt>Winters</dt><dd>${capitalize(city.climateType)}. ${city.climate}</dd></div>
        <div><dt>Main pathway</dt><dd>${city.pathway}</dd></div>
        <div><dt>Key industries</dt><dd>${city.industries.join(", ")}</dd></div>
    `;

    updateSaveButton();
    modal.showModal();
    showWeather(city);
}

export function initModal(onFavoriteChange) {
    onChange = onFavoriteChange;

    saveButton.addEventListener("click", () => {
        toggleFavorite(currentCity.id);
        updateSaveButton();
        onChange();
    });

    closeButton.addEventListener("click", () => modal.close());

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}
