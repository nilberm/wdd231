const favoritesKey = "northbound-favorites";
const filtersKey = "northbound-filters";
const defaultFilters = { province: "all", sort: "name", savedOnly: false };

function read(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
}

function write(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        return false;
    }
    return true;
}

export const getFavorites = () => read(favoritesKey, []);

export function toggleFavorite(id) {
    const favorites = getFavorites();
    const updated = favorites.includes(id)
        ? favorites.filter((item) => item !== id)
        : [...favorites, id];

    write(favoritesKey, updated);
    return updated.includes(id);
}

export const getFilters = () => ({ ...defaultFilters, ...read(filtersKey, {}) });

export const saveFilters = (filters) => write(filtersKey, filters);

export const resetFilters = () => {
    write(filtersKey, defaultFilters);
    return { ...defaultFilters };
};
