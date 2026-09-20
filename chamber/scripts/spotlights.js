const membersUrl = "data/members.json";
const spotlightContainer = document.querySelector("#spotlights");

const levelLabels = { 2: "Silver Member", 3: "Gold Member" };
const levelClasses = { 2: "silver", 3: "gold" };

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data.members);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        spotlightContainer.innerHTML = "<p>Spotlights are unavailable right now.</p>";
        console.log(error);
    }
}

function pickRandomSpotlights(members) {
    const eligible = members.filter((member) => member.membershipLevel >= 2);
    const shuffled = [...eligible].sort(() => Math.random() - 0.5);
    const count = Math.random() < 0.5 ? 2 : 3;
    return shuffled.slice(0, count);
}

function displaySpotlights(members) {
    const spotlights = pickRandomSpotlights(members);

    spotlightContainer.innerHTML = spotlights
        .map((member) => {
            const level = member.membershipLevel;
            const siteLabel = member.website.replace(/^https?:\/\/(www\.)?/, "");

            return `
                <section class="spotlight">
                    <img src="images/${member.image}" alt="${member.imageAlt}" width="300" height="200" loading="lazy">
                    <div class="spotlight__body">
                        <h3>${member.name}</h3>
                        <span class="member__badge ${levelClasses[level]}">${levelLabels[level]}</span>
                        <p>${member.phone}</p>
                        <p>${member.address}</p>
                        <p><a href="${member.website}" target="_blank" rel="noopener">${siteLabel}</a></p>
                    </div>
                </section>
            `;
        })
        .join("");
}

getSpotlights();
