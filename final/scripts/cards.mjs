import { formatRent, formatPopulation, capitalize } from "./format.mjs";

export function cityCard(city, { saved = false, asLink = false } = {}) {
    const action = asLink
        ? `<a class="btn btn--outline" href="cities.html?city=${city.id}">View details</a>`
        : `<button type="button" class="btn btn--outline" data-id="${city.id}">View details</button>`;

    return `
        <article class="city-card">
            <img src="${city.image}" alt="${city.alt}" width="300" height="200" loading="lazy">
            <div class="city-card__body">
                <h3>${city.name}</h3>
                <p class="city-card__province">${city.province}${saved ? ' <span class="badge">Saved</span>' : ""}</p>
                <dl class="facts">
                    <div><dt>Avg. 1-bed rent</dt><dd>${formatRent(city.rent)}</dd></div>
                    <div><dt>Population</dt><dd>${formatPopulation(city.population)}</dd></div>
                    <div><dt>Winters</dt><dd>${capitalize(city.climateType)}</dd></div>
                </dl>
                ${action}
            </div>
        </article>
    `;
}
