/* filtered-temples.js
   - Contains the `temples` array (7 original + 3 added)
   - Builds cards dynamically
   - Adds filter behavior (Home, Old, New, Large, Small)
   - Uses native lazy-loading for images
   - Populates footer year and last modified
*/

/* ========== Temple data ========== */
/* NOTE: the imageUrl fields use absolute addresses. You may replace them with local optimized images if preferred. */
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  /* --- Three additional temples (student added) --- */
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-utah/400x250/salt-lake-temple-lds-345022-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-1577455-wallpaper.jpg"
  },
  {
    templeName: "Nairobi Kenya",
    location: "Nairobi, Kenya",
    dedicated: "2022, April, 9",
    area: 12890,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/nairobi-kenya-temple/nairobi-kenya-temple-2.jpg"
  }
];


/* ========== Utilities & DOM refs ========== */
const cardsContainer = document.querySelector("#temple-cards");
const buttons = {
  home: document.getElementById("home"),
  old: document.getElementById("old"),
  new: document.getElementById("new"),
  large: document.getElementById("large"),
  small: document.getElementById("small")
};

/* helper: format date (to friendly) */
function formatDate(isoOrYMD) {
  // accept "YYYY-MM-DD" or date string
  const d = new Date(isoOrYMD);
  if (isNaN(d)) return isoOrYMD;
  return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
}

/* build a single temple card using template literal */
function buildTempleCard(t) {
  // create card section
  const card = document.createElement("article");
  card.className = "temple-card";
  card.setAttribute("tabindex", "0"); // keyboard focusable for accessibility

  card.innerHTML = `
    <div class="temple-thumb">
      <img src="${t.imageUrl}" alt="Image of ${t.templeName}" loading="lazy" width="640" height="360">
    </div>
    <div class="temple-body">
      <h3>${t.templeName}</h3>
      <p class="temple-meta"><strong>Location:</strong> ${t.location}</p>
      <p class="temple-meta"><strong>Dedicated:</strong> ${formatDate(t.dedicated)}</p>
      <p class="sqft"><strong>Area:</strong> ${Number(t.area).toLocaleString()} sq ft</p>
    </div>
  `;
  return card;
}

/* display array of temples */
function displayTemples(list) {
  if (!cardsContainer) return;
  cardsContainer.innerHTML = "";
  if (!list.length) {
    const empty = document.createElement("p");
    empty.textContent = "No temples match this filter.";
    cardsContainer.appendChild(empty);
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach(t => frag.appendChild(buildTempleCard(t)));
  cardsContainer.appendChild(frag);
  // update active-pressed state for accessibility (not altering here)
}

/* ========== Filter functions ========== */
function showAll() {
  displayTemples(temples);
  setPressed("home");
}
function showOld() {
  // built before 1900
  displayTemples(temples.filter(t => {
    const y = new Date(t.dedicated).getFullYear();
    return !isNaN(y) && y < 1900;
  }));
  setPressed("old");
}
function showNew() {
  // built after 2000
  displayTemples(temples.filter(t => {
    const y = new Date(t.dedicated).getFullYear();
    return !isNaN(y) && y > 2000;
  }));
  setPressed("new");
}
function showLarge() {
  displayTemples(temples.filter(t => Number(t.area) > 90000));
  setPressed("large");
}
function showSmall() {
  displayTemples(temples.filter(t => Number(t.area) < 10000));
  setPressed("small");
}

/* accessibility: reflect which button is pressed */
function setPressed(activeId) {
  Object.keys(buttons).forEach(key => {
    const btn = buttons[key];
    if (!btn) return;
    const pressed = (key === activeId);
    btn.setAttribute("aria-pressed", String(pressed));
  });
}

/* ========== Event wiring ========== */
if (buttons.home) buttons.home.addEventListener("click", showAll);
if (buttons.old) buttons.old.addEventListener("click", showOld);
if (buttons.new) buttons.new.addEventListener("click", showNew);
if (buttons.large) buttons.large.addEventListener("click", showLarge);
if (buttons.small) buttons.small.addEventListener("click", showSmall);

/* Initialize page on DOM ready */
document.addEventListener("DOMContentLoaded", () => {
  // show all by default
  showAll();

  // footer year & last modified
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const lm = document.getElementById("lastModified");
  if (lm) lm.textContent = document.lastModified;
});
