document.querySelector("#currentYear").textContent = `© ${new Date().getFullYear()}`;
document.getElementById("lastModified").textContent = document.lastModified;
const temperature = 27;
const windSpeed = 7; 
const windSpeedkmh = windspeed * 3.6;
const windChill = document.getElementById("windChill");

function calculateWindChill(temperature,  windSpeed){
    return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16;
}
if (temperature <= 10 && windSpeed > 4.8){
    windChill.textContent = `${Math.round(calculateWindChill(temperature, windSpeedkmh))}°C`;
} else{
    windChill.textContent = "N/A";
}