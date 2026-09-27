const params = new URLSearchParams(window.location.search);

const fields = {
    firstName: "out-firstName",
    lastName: "out-lastName",
    email: "out-email",
    mobile: "out-mobile",
    businessName: "out-businessName",
};

Object.entries(fields).forEach(([param, id]) => {
    const el = document.querySelector(`#${id}`);
    if (el) {
        el.textContent = params.get(param) || "Not provided";
    }
});

const timestampEl = document.querySelector("#out-timestamp");
const timestampValue = params.get("timestamp");
if (timestampEl) {
    timestampEl.textContent = timestampValue
        ? new Date(timestampValue).toLocaleString()
        : "Not provided";
}
