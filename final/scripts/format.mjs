const money = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
});

const count = new Intl.NumberFormat("en-CA");

export const formatRent = (value) => money.format(value);

export const formatPopulation = (value) => count.format(value);

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
