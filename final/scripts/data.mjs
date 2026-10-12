const citiesUrl = "data/cities.json";

export async function getCities() {
    try {
        const response = await fetch(citiesUrl);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.cities;
    } catch (error) {
        console.warn("Could not load the cities data:", error.message);
        return [];
    }
}
