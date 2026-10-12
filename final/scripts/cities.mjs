import "./site.mjs";
import { getCities } from "./data.mjs";
import { cityCard } from "./cards.mjs";
import { getFavorites, getFilters, saveFilters, resetFilters } from "./storage.mjs";
import { initModal, openCity } from "./modal.mjs";

const list = document.querySelector("#city-list");
const status = document.querySelector("#results-status");
const form = document.querySelector("#filters");
const provinceSelect = document.querySelector("#province");
const sortSelect = document.querySelector("#sort");
const savedOnlyBox = document.querySelector("#saved-only");
const resetButton = document.querySelector("#reset-filters");

const sorters = {
    name: (a, b) => a.name.localeCompare(b.name),
    "rent-asc": (a, b) => a.rent - b.rent,
    "rent-desc": (a, b) => b.rent - a.rent,
    population: (a, b) => b.population - a.population,
};

let cities = [];
let filters = getFilters();

function applyFiltersToControls() {
    provinceSelect.value = filters.province;
    sortSelect.value = filters.sort;
    savedOnlyBox.checked = filters.savedOnly;
}

function fillProvinceOptions() {
    const provinces = [...new Map(cities.map((city) => [city.provinceCode, city.province]))]
        .sort((a, b) => a[1].localeCompare(b[1]));

    provinceSelect.innerHTML = `<option value="all">All provinces</option>${provinces
        .map(([code, name]) => `<option value="${code}">${name}</option>`)
        .join("")}`;
}

function render() {
    const favorites = getFavorites();

    const visible = cities
        .filter((city) => filters.province === "all" || city.provinceCode === filters.province)
        .filter((city) => !filters.savedOnly || favorites.includes(city.id))
        .sort(sorters[filters.sort] ?? sorters.name);

    list.innerHTML = visible
        .map((city) => cityCard(city, { saved: favorites.includes(city.id) }))
        .join("");

    status.textContent = visible.length
        ? `Showing ${visible.length} of ${cities.length} cities.`
        : "No cities match your filters. Try resetting them.";
}

function readControls() {
    filters = {
        province: provinceSelect.value,
        sort: sortSelect.value,
        savedOnly: savedOnlyBox.checked,
    };
    saveFilters(filters);
    render();
}

async function init() {
    cities = await getCities();

    if (cities.length === 0) {
        status.textContent = "The city list could not be loaded. Please refresh the page.";
        return;
    }

    fillProvinceOptions();
    applyFiltersToControls();
    render();

    form.addEventListener("submit", (event) => event.preventDefault());
    form.addEventListener("change", readControls);

    resetButton.addEventListener("click", () => {
        filters = resetFilters();
        applyFiltersToControls();
        render();
    });

    list.addEventListener("click", (event) => {
        const button = event.target.closest("[data-id]");
        const city = button && cities.find((item) => item.id === button.dataset.id);

        if (city) {
            openCity(city);
        }
    });

    initModal(render);

    const requested = new URLSearchParams(window.location.search).get("city");
    const requestedCity = cities.find((city) => city.id === requested);

    if (requestedCity) {
        openCity(requestedCity);
    }
}

init();
