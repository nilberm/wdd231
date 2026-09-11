const navToggle = document.querySelector("#nav-toggle");
const navList = document.querySelector("#nav-list");

if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
        const open = navList.classList.toggle("open");
        navToggle.classList.toggle("open", open);
        navToggle.setAttribute("aria-expanded", String(open));
    });

    navList.addEventListener("click", (event) => {
        if (event.target.matches("a") && navList.classList.contains("open")) {
            navList.classList.remove("open");
            navToggle.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}
