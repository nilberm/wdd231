document.querySelector("#current-year").textContent = new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    `Last Modification: ${document.lastModified}`;
