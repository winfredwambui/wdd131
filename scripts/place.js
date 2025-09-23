// Footer year
document.querySelector("#currentyear").textContent = new Date().getFullYear();

// Last modified date
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Hamburger menu toggle
const menuButton = document.querySelector("#menu");
const menuItems = document.querySelector("#menu-items");

menuButton.addEventListener("click", () => {
  menuItems.classList.toggle("open");
  menuButton.textContent = menuButton.textContent === "☰" ? "✖" : "☰";
});

// Weather data (static for now)
const temp = parseFloat(document.querySelector("#temp").textContent);
const wind = parseFloat(document.querySelector("#wind").textContent);
const windchillSpan = document.querySelector("#windchill");

// Wind Chill formula (Celsius)
function calculateWindChill(tempC, windKmh) {
  return (
    13.12 +
    0.6215 * tempC -
    11.37 * Math.pow(windKmh, 0.16) +
    0.3965 * tempC * Math.pow(windKmh, 0.16)
  ).toFixed(1);
}

// Apply conditions
if (temp <= 10 && wind > 4.8) {
  windchillSpan.textContent = calculateWindChill(temp, wind) + " °C";
} else {
  windchillSpan.textContent = "N/A";
}
