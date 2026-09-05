const menuToggle = document.querySelector("#menu-toggle");
const navList = document.querySelector(".primary-nav__list");

if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("is-open");
        menuToggle.classList.toggle("is-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navList.addEventListener("click", (event) => {
        if (event.target.matches("a") && navList.classList.contains("is-open")) {
            navList.classList.remove("is-open");
            menuToggle.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    });
}
