const apiKey = "cd132c1b677d943709a9b61f7c929b9c";

export async function getWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return {
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
        };
    } catch (error) {
        console.warn("Could not load the weather:", error.message);
        return null;
    }
}
