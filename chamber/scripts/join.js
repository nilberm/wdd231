const timestampField = document.querySelector("#timestamp");
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

const modalButtons = document.querySelectorAll(".membership-link");
modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(`#${button.dataset.modal}`);
        if (modal) {
            modal.showModal();
        }
    });
});

const modalCloseButtons = document.querySelectorAll(".modal-close");
modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});
