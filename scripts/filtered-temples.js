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
