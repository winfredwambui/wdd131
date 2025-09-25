// ============================
// Weather & Wind Chill Section
// ============================

// Example weather data (you can replace this with live API later)
const temperature = 22; // °C
const windSpeed = 12; // km/h

document.addEventListener("DOMContentLoaded", () => {
  const tempElement = document.createElement("p");
  tempElement.textContent = `Temperature: ${temperature}°C`;

  const windElement = document.createElement("p");
  windElement.textContent = `Wind Speed: ${windSpeed} km/h`;

  const chillElement = document.createElement("p");

  // Wind chill formula (Celsius, km/h)S
  function calculateWindChill(t, s) {
    if (t <= 10 && s > 4.8) {
      return (
        13.12 +
        0.6215 * t -
        11.37 * Math.pow(s, 0.16) +
        0.3965 * t * Math.pow(s, 0.16)
      ).toFixed(1);
    } else {
      return "N/A";
    }
  }

  const windChill = calculateWindChill(temperature, windSpeed);
  chillElement.textContent = `Wind Chill: ${windChill}`;

  const weatherDiv = document.querySelector(".weather");
  if (weatherDiv) {
    weatherDiv.appendChild(tempElement);
    weatherDiv.appendChild(windElement);
    weatherDiv.appendChild(chillElement);
  }

  // ============================
  // Footer Current Year + Name
  // ============================
  const footer = document.querySelector("footer p");
  if (footer) {
    const year = new Date().getFullYear();
    footer.textContent = `© ${year} Winfred Wambui. All rights reserved.`;
  }
});
