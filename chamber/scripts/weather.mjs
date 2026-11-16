import { weatherApiKey } from './weather-config.mjs';

const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast');
const coordinates = 'lat=-24.1858&lon=-65.2995';

function showCurrentWeather(data) {
  currentWeather.innerHTML = `
    <p class="temperature">${Math.round(data.main.temp)} °C</p>
    <p>${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
}

function showForecast(data) {
  const today = new Date(Date.now() + data.city.timezone * 1000)
    .toISOString().slice(0, 10);
  const days = data.list.filter((item) => {
    const localDate = new Date((item.dt + data.city.timezone) * 1000);
    return localDate.toISOString().slice(0, 10) > today &&
      localDate.getUTCHours() === 12;
  }).slice(0, 3);

  forecast.innerHTML = days.map((day) => {
    const label = new Date(day.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric',
      timeZone: 'America/Argentina/Jujuy'
    });
    return `<p><strong>${label}:</strong> ${Math.round(day.main.temp)} °C</p>`;
  }).join('');
}

async function loadWeather() {
  if (!weatherApiKey) {
    currentWeather.textContent = 'Weather is unavailable until the OpenWeatherMap connection is configured.';
    forecast.textContent = 'Forecast is currently unavailable.';
    return;
  }
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${coordinates}&units=metric&appid=${weatherApiKey}`);
    if (!response.ok) throw new Error('Could not load current weather.');
    showCurrentWeather(await response.json());
  } catch (error) {
    currentWeather.textContent = 'Current weather is unavailable. Please try again later.';
  }
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?${coordinates}&units=metric&appid=${weatherApiKey}`);
    if (!response.ok) throw new Error('Could not load forecast.');
    showForecast(await response.json());
  } catch (error) {
    forecast.textContent = 'Forecast is unavailable. Please try again later.';
  }
}

loadWeather();
