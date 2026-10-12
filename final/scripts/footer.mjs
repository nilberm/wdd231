export function initFooter() {
    const year = document.querySelector("#year");
    const modified = document.querySelector("#last-modified");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (modified) {
        modified.textContent = document.lastModified;
    }
}
