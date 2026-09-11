const membersUrl = "data/members.json";
const membersContainer = document.querySelector("#members");
const viewButtons = document.querySelectorAll(".view-toggle button");

const levelLabels = { 1: "Member", 2: "Silver", 3: "Gold" };
const levelClasses = { 1: "", 2: "silver", 3: "gold" };

async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        membersContainer.innerHTML = `<p class="error">Sorry, the member list could not be loaded (${error.message}).</p>`;
    }
}

const displayMembers = (members) => {
    membersContainer.innerHTML = "";

    members.forEach((member, index) => {
        const card = document.createElement("section");
        card.classList.add("member");

        const level = member.membershipLevel;
        const phoneDigits = member.phone.replace(/[^\d+]/g, "");
        const siteLabel = member.website.replace(/^https?:\/\/(www\.)?/, "");
        const priority = index === 0 ? 'fetchpriority="high"' : 'loading="lazy"';
        const smallImage = member.image.replace(/\.jpg$/, "-sm.jpg");

        card.innerHTML = `
            <div class="member__head">
                <h2>${member.name}</h2>
                <p class="member__tag">${member.tagline}</p>
                <span class="member__badge ${levelClasses[level]}">${levelLabels[level]}</span>
            </div>
            <div class="member__body">
                <img src="images/${smallImage}"
                     srcset="images/${smallImage} 440w, images/${member.image} 900w"
                     sizes="(min-width: 700px) 340px, 220px"
                     alt="${member.imageAlt}"
                     ${priority} width="300" height="200">
                <dl>
                    <dt>Email</dt>
                    <dd><a href="mailto:${member.email}">${member.email}</a></dd>
                    <dt>Phone</dt>
                    <dd><a href="tel:${phoneDigits}">${member.phone}</a></dd>
                    <dt>Address</dt>
                    <dd>${member.address}</dd>
                    <dt>Website</dt>
                    <dd><a href="${member.website}" target="_blank" rel="noopener">${siteLabel}</a></dd>
                </dl>
            </div>
        `;

        membersContainer.appendChild(card);
    });
};

const setView = (view) => {
    membersContainer.classList.toggle("grid-view", view === "grid");
    membersContainer.classList.toggle("list-view", view === "list");

    viewButtons.forEach((button) => {
        const active = button.dataset.view === view;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });

    try {
        localStorage.setItem("chamber-directory-view", view);
    } catch (error) {
        savedView = view;
    }
};

let savedView = "grid";
try {
    savedView = localStorage.getItem("chamber-directory-view") || "grid";
} catch (error) {
    savedView = "grid";
}

viewButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
});

setView(savedView);
getMembers();
