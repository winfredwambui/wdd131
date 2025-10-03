// Select footer elements
const yearSpan = document.getElementById("currentYear");
const lastModified = document.getElementById("lastModified");

// Get the current year
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// Get the last modified date of the document
const date = new Date(document.lastModified);

// Format it as: MM/DD/YYYY HH:MM:SS
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
};

lastModified.textContent = date.toLocaleString(undefined, options);
