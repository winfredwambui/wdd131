// Populate product options dynamically
const products = [
  { id: 1, name: "Adventure Kayak" },
  { id: 2, name: "Whitewater Helmet" },
  { id: 3, name: "Rafting Paddle" },
  { id: 4, name: "Dry Bag" },
  { id: 5, name: "Life Jacket" }
];

const productSelect = document.getElementById("productName");
products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.name;
  option.textContent = product.name;
  productSelect.appendChild(option);
});

// Review submission and counter logic
document.getElementById("reviewForm").addEventListener("submit", (e) => {
  e.preventDefault();
  
  let count = Number(localStorage.getItem("reviewCount")) || 0;
  count++;
  localStorage.setItem("reviewCount", count);

  window.location.href = "review.html";
});

// Update footer year
document.getElementById("year").textContent = new Date().getFullYear();
