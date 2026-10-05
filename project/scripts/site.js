const lagosTime = document.querySelector("#lagos-time");
const lagosDate = document.querySelector("#lagos-date");
const timeZone = "Africa/Lagos";

function updateLagosClock() {
  if (!lagosTime || !lagosDate) return;

  const now = new Date();
  lagosTime.dateTime = now.toISOString();
  lagosTime.textContent = new Intl.DateTimeFormat("en-NG", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(now);
  lagosDate.textContent = new Intl.DateTimeFormat("en-NG", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(now);
}

updateLagosClock();
window.setInterval(updateLagosClock, 30_000);

const weatherDescription = document.querySelector("#weather-description");
const weatherSymbols = new Map([
  [0, ["Clear sky", "☀"]],
  [1, ["Mainly clear", "◒"]],
  [2, ["Partly cloudy", "◐"]],
  [3, ["Overcast", "☁"]],
  [45, ["Foggy", "≋"]],
  [48, ["Rime fog", "≋"]],
  [51, ["Light drizzle", "☂"]],
  [53, ["Drizzle", "☂"]],
  [55, ["Heavy drizzle", "☂"]],
  [61, ["Light rain", "☂"]],
  [63, ["Rain", "☂"]],
  [65, ["Heavy rain", "☂"]],
  [80, ["Rain showers", "☂"]],
  [81, ["Showers", "☂"]],
  [82, ["Heavy showers", "☂"]],
  [95, ["Thunderstorm", "⚡"]],
  [96, ["Thunderstorm with hail", "⚡"]],
  [99, ["Heavy thunderstorm", "⚡"]]
]);

async function loadLagosWeather() {
  if (!weatherDescription) return;

  const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=3.3792&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Africa%2FLagos";

  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error("Weather request failed");

    const { current, current_units: units } = await response.json();
    const [description, icon] = weatherSymbols.get(current.weather_code) || ["Current conditions", "☁"];
    const temperature = document.querySelector("#weather-temp");
    const weatherIcon = document.querySelector("#weather-icon");
    const weatherDetail = document.querySelector("#weather-detail");
    if (temperature) temperature.textContent = `${Math.round(current.temperature_2m)}${units.temperature_2m}`;
    if (weatherIcon) weatherIcon.textContent = icon;
    weatherDescription.textContent = description;
    if (weatherDetail) weatherDetail.textContent = `Feels like ${Math.round(current.apparent_temperature)}° · Humidity ${current.relative_humidity_2m}% · Wind ${Math.round(current.wind_speed_10m)} ${units.wind_speed_10m}`;
  } catch {
    weatherDescription.textContent = "Live weather is temporarily unavailable.";
    const weatherDetail = document.querySelector("#weather-detail");
    if (weatherDetail) weatherDetail.textContent = "Check again in a little while.";
  }
}

loadLagosWeather();

const visitKey = "naijaFieldGuideVisits";
const visitCount = Number(localStorage.getItem(visitKey) || 0) + 1;
localStorage.setItem(visitKey, String(visitCount));
const visitCountElement = document.querySelector("#visitor-count");
const currentYear = document.querySelector("#current-year");
if (visitCountElement) visitCountElement.textContent = visitCount.toLocaleString("en-NG");
if (currentYear) currentYear.textContent = new Date().getFullYear();

const lightbox = document.querySelector(".lightbox");

if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("p");

  document.querySelectorAll(".gallery-open").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = button.closest("figure").querySelector("figcaption strong").textContent;
      lightbox.showModal();
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}