import "./site.mjs";
import { getCities } from "./data.mjs";
import { cityCard } from "./cards.mjs";
import { formatRent } from "./format.mjs";

const container = document.querySelector("#featured-cities");
const stats = document.querySelector("#featured-stats");

async function init() {
    const cities = await getCities();

    if (cities.length === 0) {
        container.textContent = "Featured cities are not available right now.";
        return;
    }

    container.innerHTML = cities
        .filter((city) => city.featured)
        .map((city) => cityCard(city, { asLink: true }))
        .join("");

    const averageRent = cities.reduce((total, city) => total + city.rent, 0) / cities.length;
    stats.textContent = `Northbound compares ${cities.length} cities. The average one bedroom rent across them is about ${formatRent(averageRent)} per month.`;
}

init();
