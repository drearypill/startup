const player = "X";
const computer = "O";

let board_full = false;
let play_board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".play-area");

const winner_statement = document.getElementById("winner");

async function getPlayerName() {
  const storageName = await localStorage.getItem("userName");
  return storageName;
}
async function getWins() {
  const wins = await localStorage.getItem("wins");
  return wins;
}
async function getLosses() {
  const losses = await localStorage.getItem("losses");
  return losses;
}
async function getTies() {
  const ties = await localStorage.getItem("ties");
  return ties;
}
async function updateWinsSpan() {
  const wins = await getWins();
  const winsSpan = document.getElementById("wins-id");
  winsSpan.textContent = wins;
}
async function updateLossesSpan() {
  const losses = await getLosses();
  const lossesSpan = document.getElementById("losses-id");
  lossesSpan.textContent = losses;
}
async function updateTiesSpan() {
  const ties = await getTies();
  const tiesSpan = document.getElementById("ties-id");
  tiesSpan.textContent = ties;
}

let playerList = [];

// Load player list from localStorage
function loadPlayerList() {
  const playerListString = localStorage.getItem("playerList");
  if (playerListString) {
    playerList = JSON.parse(playerListString);
  }
}

// Save player list to localStorage
function savePlayerList() {
  localStorage.setItem("playerList", JSON.stringify(playerList));
}

async function createPlayer(playerName) {
  try {
    // Simulate an asynchronous operation (e.g., fetching data from a server)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create the player object with scores set to 0
    const player = {
      playerName: playerName,
      wins: 0,
      losses: 0,
      ties: 0,
    };

    // Add the player object to the playerList
    playerList.push(player);

    // Save the updated player list to localStorage
    savePlayerList();

    return player;
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
}
var currentname = localStorage.getItem("userName");
createPlayer(currentname);

// Function to edit the wins count of a player
function incrementWins(playerName) {
  const player = playerList.find((p) => p.playerName === playerName);
  if (player) {
    player.wins += 1;
    savePlayerList(); // Save the updated player list to localStorage
    return player;
  }
  return null; // Player not found
}

// Function to edit the losses count of a player
function incrementLosses(playerName) {
  const player = playerList.find((p) => p.playerName === playerName);
  if (player) {
    player.losses += 1;
    savePlayerList(); // Save the updated player list to localStorage
    return player;
  }
  return null; // Player not found
}

// Function to edit the losses count of a player
function incrementTies(playerName) {
  const player = playerList.find((p) => p.playerName === playerName);
  if (player) {
    player.ties += 1;
    savePlayerList(); // Save the updated player list to localStorage
    return player;
  }
  return null; // Player not found
}

check_board_complete = () => {
  let flag = true;
  play_board.forEach((element) => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  board_full = flag;
};

const check_line = (a, b, c) => {
  return (
    play_board[a] == play_board[b] &&
    play_board[b] == play_board[c] &&
    (play_board[a] == player || play_board[a] == computer)
  );
};

const check_match = () => {
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      return play_board[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      return play_board[i];
    }
  }
  if (check_line(0, 4, 8)) {
    return play_board[0];
  }
  if (check_line(2, 4, 6)) {
    return play_board[2];
  }
  return "";
};

//check for and create key pairs
if (localStorage.getItem("wins")) {
} else {
  const wins = localStorage.setItem("wins", 0);
}
if (localStorage.getItem("losses")) {
} else {
  const losses = localStorage.setItem("losses", 0);
}
if (localStorage.getItem("ties")) {
} else {
  const ties = localStorage.setItem("ties", 0);
}

const check_for_winner = () => {
  let res = check_match();
  if (res == player) {
    winner.innerText = "You Win!";
    winner.classList.add("playerWin");
    board_full = true;
    var value = localStorage.getItem("wins");
    value = parseInt(value) + 1;
    localStorage.setItem("wins", value);
    updateWinsSpan();
    incrementWins(currentname);
  } else if (res == computer) {
    winner.innerText = "You Lost :(";
    winner.classList.add("computerWin");
    board_full = true;
    var value = localStorage.getItem("losses");
    value = parseInt(value) + 1;
    localStorage.setItem("losses", value);
    updateLossesSpan();
    incrementLosses(currentname);
  } else if (board_full) {
    winner.innerText = "Draw!";
    winner.classList.add("draw");
    var value = localStorage.getItem("ties");
    value = parseInt(value) + 1;
    localStorage.setItem("ties", value);
    updateTiesSpan();
    incrementTies(currentname);
  }
};

const render_board = () => {
  board_container.innerHTML = "";
  play_board.forEach((e, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`;
    if (e == player || e == computer) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

const game_loop = () => {
  render_board();
  check_board_complete();
  check_for_winner();
};

const addPlayerMove = (e) => {
  if (!board_full && play_board[e] == "") {
    play_board[e] = player;
    game_loop();
    addComputerMove();
  }
};

const addComputerMove = () => {
  if (!board_full) {
    setTimeout(() => {
      do {
        selected = Math.floor(Math.random() * 9);
      } while (play_board[selected] != "");
      play_board[selected] = computer;
      game_loop();
    }, 500);
    board_full = true; // 2000 milliseconds = 2 seconds
  }
};

const reset_board = () => {
  play_board = ["", "", "", "", "", "", "", "", ""];
  board_full = false;
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board();
};

//initial render
render_board();
