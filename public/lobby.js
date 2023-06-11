//populate the dropdown menu
const dropdown = document.querySelector("#playerSelect");
async function loadPlayers() {
  let players = ["Thomas", "Lesley", "Jackson"];

  const response = await fetch("/api/players");
  players = await response.json();
  for (player of players) {
    const name = document.createElement("option");
    name.textContent = player;
    dropdown.appendChild(name);
  }
}
loadPlayers();
// Get the <select> element
user = localStorage.getItem("userName");
// Function to store the selected value in local storage
function storeSelection() {
  localStorage.setItem("opponentName", dropdown.value);
  window.location.href = "play.html";
}
async function create() {
  localStorage.setItem("opponentName", "Mystery Player");
  const response = await fetch("/api/player", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ user }),
  });
  window.location.href = "play.html";
}
