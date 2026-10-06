const storageKey = "chamber-last-visit";
const msPerDay = 1000 * 60 * 60 * 24;

export function getVisitMessage() {
    const now = Date.now();
    let lastVisit = null;

    try {
        lastVisit = Number(localStorage.getItem(storageKey)) || null;
        localStorage.setItem(storageKey, String(now));
    } catch (error) {
        lastVisit = null;
    }

    if (!lastVisit) {
        return "Welcome! Let us know if you have any questions.";
    }

    const days = Math.floor((now - lastVisit) / msPerDay);

    if (days < 1) {
        return "Back so soon! Awesome!";
    }

    return `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
}
