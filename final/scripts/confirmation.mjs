import "./site.mjs";
import { getCities } from "./data.mjs";
import { cityCard } from "./cards.mjs";

const params = new URLSearchParams(window.location.search);
const summary = document.querySelector("#summary");
const recommendations = document.querySelector("#recommendations");
const recommendationsNote = document.querySelector("#recommendations-note");

const climateLabels = {
    any: "No preference",
    mild: "Mild winters",
    moderate: "Moderate winters",
    cold: "Cold winters",
};

const pathwayLabels = {
    "express-entry": "Express Entry",
    pnp: "Provincial Nominee Program",
    "work-permit": "Work permit",
    "not-sure": "Not sure yet",
};

const fields = [
    ["Name", params.get("fullName")],
    ["Email", params.get("email")],
    ["Maximum rent", params.get("budget") ? `$${params.get("budget")} CAD per month` : null],
    ["Winter climate", climateLabels[params.get("climate")]],
    ["Family size", params.get("familySize")],
    ["Pathway", pathwayLabels[params.get("pathway")]],
    ["Notes", params.get("notes")],
];

function showSummary() {
    const answered = fields.filter(([, value]) => value);

    if (answered.length === 0) {
        summary.outerHTML = '<p>No form data was found. <a href="pathways.html">Go to the form</a> to send your request.</p>';
        return false;
    }

    answered.forEach(([label, value]) => {
        const term = document.createElement("dt");
        const detail = document.createElement("dd");
        term.textContent = label;
        detail.textContent = value;
        summary.append(term, detail);
    });

    return true;
}

async function showRecommendations() {
    const budget = Number(params.get("budget"));
    const climate = params.get("climate");
    const cities = await getCities();

    const matches = cities
        .filter((city) => city.rent <= budget)
        .filter((city) => climate === "any" || city.climateType === climate)
        .sort((a, b) => a.rent - b.rent)
        .slice(0, 3);

    if (matches.length === 0) {
        recommendationsNote.textContent = "No cities matched your budget and climate. Try a higher budget or no climate preference.";
        return;
    }

    recommendationsNote.textContent = `These ${matches.length} cities fit your budget, starting with the lowest rent.`;
    recommendations.innerHTML = matches.map((city) => cityCard(city, { asLink: true })).join("");
}

if (showSummary()) {
    showRecommendations();
} else {
    recommendationsNote.textContent = "Submit the form to see city recommendations.";
}
