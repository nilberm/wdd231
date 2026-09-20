const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const weatherIcon = document.querySelector("#weather-icon");
const forecastList = document.querySelector("#forecast-list");

const lat = -3.73;
const lon = -38.52;
const units = "metric";
const apiKey = "cd132c1b677d943709a9b61f7c929b9c";

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

async function getCurrentWeather() {
    try {
        const response = await fetch(currentUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        weatherDesc.textContent = "Weather is unavailable right now.";
        console.log(error);
    }
}

function displayCurrentWeather(data) {
    currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDesc.textContent = data.weather[0].description;
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    weatherIcon.setAttribute("alt", data.weather[0].description);
}

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data.list);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        forecastList.innerHTML = "<li>Forecast is unavailable right now.</li>";
        console.log(error);
    }
}

function pickDailyEntries(list) {
    const today = new Date().toISOString().slice(0, 10);
    const byDate = {};

    list.forEach((entry) => {
        const [date, time] = entry.dt_txt.split(" ");
        if (date === today) {
            return;
        }
        const hour = Number(time.slice(0, 2));
        const distanceFromNoon = Math.abs(hour - 12);
        if (!byDate[date] || distanceFromNoon < byDate[date].distanceFromNoon) {
            byDate[date] = { entry, distanceFromNoon };
        }
    });

    return Object.values(byDate)
        .slice(0, 3)
        .map((item) => item.entry);
}

function displayForecast(list) {
    const days = pickDailyEntries(list);
    const dayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" });

    forecastList.innerHTML = days
        .map((entry) => {
            const date = new Date(entry.dt_txt.replace(" ", "T"));
            const dayName = dayFormatter.format(date);
            const temp = Math.round(entry.main.temp);
            const icon = entry.weather[0].icon;
            const desc = entry.weather[0].description;

            return `
                <li>
                    <p class="forecast__day">${dayName}</p>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" width="50" height="50" loading="lazy">
                    <p class="forecast__temp">${temp}&deg;C</p>
                </li>
            `;
        })
        .join("");
}

getCurrentWeather();
getForecast();
