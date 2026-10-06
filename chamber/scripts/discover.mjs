import { places } from "../data/discover.mjs";
import { getVisitMessage } from "./visit.mjs";

const placesContainer = document.querySelector("#places");
const modal = document.querySelector("#place-modal");
const visitMessage = document.querySelector("#visit-message");

document.querySelector("#visit-text").textContent = getVisitMessage();
visitMessage.hidden = false;

document.querySelector("#visit-close").addEventListener("click", () => {
    visitMessage.hidden = true;
});

placesContainer.innerHTML = places
    .map((place, index) => {
        const loading = index === 0 ? 'fetchpriority="high"' : 'loading="lazy"';

        return `
            <article class="place">
                <h2>${place.name}</h2>
                <figure>
                    <img src="${place.image}" alt="${place.alt}" width="300" height="200" ${loading}>
                </figure>
                <p>${place.description}</p>
                <address>${place.address}</address>
                <button type="button" class="place__more" data-id="${place.id}">Learn more</button>
            </article>
        `;
    })
    .join("");

placesContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".place__more");
    if (!button) {
        return;
    }

    const place = places.find((item) => item.id === button.dataset.id);
    document.querySelector("#modal-title").textContent = place.name;
    document.querySelector("#modal-address").textContent = place.address;
    document.querySelector("#modal-details").textContent = place.details;
    modal.showModal();
});

modal.querySelector(".modal-close").addEventListener("click", () => {
    modal.close();
});
