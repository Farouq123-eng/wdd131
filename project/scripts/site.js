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
const weatherConditions = [
  { codes: [0], description: "Clear sky", icon: "☀" },
  { codes: [1], description: "Mainly clear", icon: "◒" },
  { codes: [2], description: "Partly cloudy", icon: "◐" },
  { codes: [3], description: "Overcast", icon: "☁" },
  { codes: [45, 48], description: "Foggy", icon: "≋" },
  { codes: [51, 53, 55], description: "Drizzle", icon: "☂" },
  { codes: [61, 63, 65], description: "Rain", icon: "☂" },
  { codes: [80, 81, 82], description: "Rain showers", icon: "☂" },
  { codes: [95, 96, 99], description: "Thunderstorm", icon: "⚡" }
];

async function loadLagosWeather() {
  if (!weatherDescription) return;

  const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=3.3792&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Africa%2FLagos";

  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error("Weather request failed");

    const { current, current_units: units } = await response.json();
    const condition = weatherConditions.find((item) => item.codes.includes(current.weather_code)) || {
      description: "Current conditions",
      icon: "☁"
    };
    const temperature = document.querySelector("#weather-temp");
    const weatherIcon = document.querySelector("#weather-icon");
    const weatherDetail = document.querySelector("#weather-detail");
    if (temperature) temperature.textContent = `${Math.round(current.temperature_2m)}${units.temperature_2m}`;
    if (weatherIcon) weatherIcon.textContent = condition.icon;
    weatherDescription.textContent = condition.description;
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

  [...document.querySelectorAll(".gallery-open")].forEach((button) => {
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

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inquiry = Object.fromEntries(new FormData(contactForm).entries());
    sessionStorage.setItem("fieldGuideInquiry", JSON.stringify(inquiry));
    window.location.href = "message.html";
  });
}

const confirmationMessage = document.querySelector("#confirmation-message");

if (confirmationMessage) {
  const inquiryData = sessionStorage.getItem("fieldGuideInquiry");
  const inquiryDetails = document.querySelector("#inquiry-details");

  if (inquiryData) {
    const inquiry = JSON.parse(inquiryData);
    document.querySelector("#submitted-name").textContent = inquiry.name;
    document.querySelector("#submitted-email").textContent = inquiry.email;
    document.querySelector("#submitted-topic").textContent = inquiry.topic;
    document.querySelector("#submitted-message").textContent = inquiry.message;
    sessionStorage.removeItem("fieldGuideInquiry");
  } else {
    confirmationMessage.textContent = "There is no recent message to display. You can send a question or suggestion from the contact page.";
    if (inquiryDetails) inquiryDetails.hidden = true;
  }
}