export function initNav() {
    const toggle = document.querySelector("#nav-toggle");
    const list = document.querySelector("#nav-list");

    if (!toggle || !list) {
        return;
    }

    toggle.addEventListener("click", () => {
        const isOpen = list.classList.toggle("open");
        toggle.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    list.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            list.classList.remove("open");
            toggle.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
}
