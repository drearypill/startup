// const playerNameEl = document.querySelector(".player-name");
// playerNameEl.textContent = localStorage.getItem("userName") ?? "Mystery Player";

// function beginGame() {
//   const checkedBox = document.querySelector('input[name="varRadio"]:checked');
//   localStorage.setItem("opponentName", checkedBox.value);
//   window.location.href = "play.html";
// }

// // simulate database list retrieval
// const retrievedData = ["Ada", "Tim"];

// const radioGroupEl = document.querySelector("#gamelist");
// radioGroupEl.innerHTML += retrievedData
//   .map(
//     (name) => `
// <div class="form-check">
// <input class="form-check-input" type="radio" id="${name}" name="varRadio" value="${name}" />
// <label class="form-check-label" for="${name}">${name}</label>
// </div>
// `
//   )
//   .join("");

// (function () {
//   "#edit".change(function () {
//     localStorage.setItem("opponenetName", this.value);
//   });
//   // if (localStorage.getItem("todoData")) {
//   //   "#edit".val(localStorage.getItem("todoData"));
//   // }
// });

// function play() {
//   localStorage.setItem("opponentName", this.value);
//   window.location.href = "play.html";
// }

// Get the <select> element
const dropdown = document.getElementById("playerSelect");

// Function to store the selected value in local storage
function storeSelection(value) {
  localStorage.setItem("opponentName", value);
}

// Check if a previously selected option is stored in local storage
if (localStorage.getItem("opponentName")) {
  // Set the dropdown's value to the stored value
  dropdown.value = localStorage.getItem("opponentName");
}
