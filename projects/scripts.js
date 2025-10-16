/* scripts.js - dynamic features for SafeNet.
   - builds nav
   - populates features & services (objects/array + map/filter)
   - handles filtering (conditional branching)
   - contact form handling
   - localStorage: visit counts & saved favorites
   - uses template literals exclusively for HTML strings
*/

const NAV = [
  { href: "index.html", title: "Home" },
  { href: "services.html", title: "Services" },
  { href: "contact.html", title: "Contact" }
];

/* Example features / service objects */
const FEATURES = [
  { id: "f1", title: "Password Best Practices", category: "passwords", image: "images/sec-thumb-1.webp", summary: "How to build and store strong passwords."},
  { id: "f2", title: "Privacy Settings Guide", category: "privacy", image: "images/sec-thumb-2.webp", summary: "Tighten privacy on social platforms."},
  { id: "f3", title: "Home Network Basics", category: "network", image: "images/sec-thumb-3.webp", summary: "Secure your home Wi-Fi and devices."}
];

/* ---------- Utility functions ---------- */
function byId(id){ return document.getElementById(id) }

/* build main nav (used on all pages) */
function buildNav(){
  const nav = byId("main-nav");
  if(!nav) return;
  NAV.forEach(item => {
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.title;
    nav.appendChild(a);
  });
}

/* build feature cards (used on index) */
function buildFeatureCards(list){
  const container = byId("features");
  if(!container) return;
  container.innerHTML = "";
  list.forEach(f => {
    const card = document.createElement("article");
    card.className = "card feature-card";
    card.innerHTML = `
      <img class="feature-thumb" src="${f.image}" alt="${f.title}" loading="lazy">
      <h3>${f.title}</h3>
      <p>${f.summary}</p>
      <p><button data-id="${f.id}" class="save-btn">Save</button></p>
    `;
    container.appendChild(card);
  });

  // add save handlers (delegation)
  container.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      toggleSaved(id);
    });
  });
}

/* Build service cards on Services page with filter support */
function buildServiceCards(filter="all"){
  const container = byId("service-cards");
  if(!container) return;
  const list = (filter === "all") ? FEATURES : FEATURES.filter(f => f.category === filter);
  container.innerHTML = "";
  list.forEach(f => {
    container.insertAdjacentHTML("beforeend", `
      <article class="card">
        <img src="${f.image}" alt="${f.title}" loading="lazy" class="feature-thumb">
        <h3>${f.title}</h3>
        <p>${f.summary}</p>
      </article>
    `);
  });
}

/* localStorage: simple saved items toggle */
function getSaved(){
  const raw = localStorage.getItem("safenet_saved") || "[]";
  try { return JSON.parse(raw) } catch { return [] }
}
function setSaved(list){ localStorage.setItem("safenet_saved", JSON.stringify(list)) }
function toggleSaved(id){
  const saved = getSaved();
  const idx = saved.indexOf(id);
  if(idx === -1) saved.push(id);
  else saved.splice(idx,1);
  setSaved(saved);
  // UI feedback (simple)
  alert(`Saved items: ${saved.length}`);
}

/* visits counter (localStorage) */
function updateVisitCount(){
  const key = "safenet_visits";
  let n = Number(localStorage.getItem(key) || 0);
  n++;
  localStorage.setItem(key, String(n));
  const el = byId("visit-count");
  if(el) el.textContent = `Visits (this browser): ${n}`;
}

/* Contact form handler — demonstrates DOM interaction and conditional branching */
function handleContactForm(){
  const form = byId("contactForm");
  if(!form) return;
  const result = byId("form-result");
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";
    // simple conditional branching: validate length
    if(!email.includes("@")){
      result.hidden = false;
      result.className = "card";
      result.textContent = "Please provide a valid email address.";
      return;
    }
    if(message.trim().length < 10){
      result.hidden = false;
      result.className = "card";
      result.textContent = "Message is too short — please add details.";
      return;
    }
    // save recent contact to localStorage (object example)
    const contactsRaw = localStorage.getItem("safenet_contacts") || "[]";
    const contacts = JSON.parse(contactsRaw);
    contacts.push({ id: Date.now(), email, message, topic: formData.get("topic"), name: formData.get("name") });
    localStorage.setItem("safenet_contacts", JSON.stringify(contacts));
    result.hidden = false;
    result.className = "card";
    result.innerHTML = `<strong>Thanks!</strong> Your message was saved. (You have ${contacts.length} saved message(s).)`;
    form.reset();
  });
}

/* init function runs on DOMContentLoaded */
function init(){
  buildNav();
  buildFeatureCards(FEATURES);
  buildServiceCards();
  updateVisitCount();
  handleContactForm();

  // services page filter binding
  const filterEl = byId("filter");
  if(filterEl) filterEl.addEventListener("change", (e) => buildServiceCards(e.target.value));
}

/* run when DOM ready */
document.addEventListener("DOMContentLoaded", init);
