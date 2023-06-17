// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === "http:" ? "ws" : "wss";
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

let player, opponent;
if (localStorage.getItem("opponentName") === "") {
  player = "X";
  opponent = "O";
} else {
  player = "O";
  opponent = "X";
}

const messageEvent = "message";
const moveEvent = "move";
const gameStartEvent = "gameStart";
const gameEndEvent = "gameEnd";
const gameHostEvent = "gameHost";
const gameRestartEvent = "gameRestart";

let board_full = true;
let play_board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".play-area");

const winner_statement = document.getElementById("winner");
var currentname = localStorage.getItem("userName");

function getWins() {
  const playerListString = localStorage.getItem("playerList");
  const playerList = JSON.parse(playerListString) || [];
  const playerName = localStorage.getItem("userName"); // Replace with the desired player name

  const player = playerList.find((player) => player.playerName === playerName);
  if (player) {
    return player.wins;
  }
  return 0; // Return 0 if the player is not found
}

function getLosses() {
  const playerListString = localStorage.getItem("playerList");
  const playerList = JSON.parse(playerListString) || [];
  const playerName = localStorage.getItem("userName"); // Replace with the desired player name

  const player = playerList.find((player) => player.playerName === playerName);
  if (player) {
    return player.losses;
  }
  return 0; // Return 0 if the player is not found
}
function getTies() {
  const playerListString = localStorage.getItem("playerList");
  const playerList = JSON.parse(playerListString) || [];
  const playerName = localStorage.getItem("userName"); // Replace with the desired player name

  const player = playerList.find((player) => player.playerName === playerName);
  if (player) {
    return player.ties;
  }
  return 0; // Return 0 if the player is not found
}
function updateWinsSpan() {
  const wins = getWins();
  const winsSpan = document.getElementById("wins-id");
  winsSpan.textContent = wins;
}
function updateLossesSpan() {
  const losses = getLosses();
  const lossesSpan = document.getElementById("losses-id");
  lossesSpan.textContent = losses;
}
function updateTiesSpan() {
  const ties = getTies();
  const tiesSpan = document.getElementById("ties-id");
  tiesSpan.textContent = ties;
}

let playerList = JSON.parse(localStorage.getItem("playerList")) || [];
function getPlayerName() {
  const storageName = localStorage.getItem("userName");
  return storageName ?? "Mystery player";
}
function getOpponentName() {
  const storageoName = localStorage.getItem("opponentName");
  return storageoName ?? "Mystery player";
}

function updatePlayerNameSpan() {
  if (player === "X") {
    const playerName = getPlayerName();
    const playerNameSpan = document.getElementById("player-name");
    playerNameSpan.textContent = playerName;
  } else {
    const opponentName = getOpponentName();
    const playerNameSpan = document.getElementById("player-name");
    playerNameSpan.textContent = opponentName;
  }
}
function updateOpponentNameSpan() {
  if (player === "X") {
    const opponentName = getOpponentName();
    const opponentNameSpan = document.getElementById("opponent-name");
    opponentNameSpan.textContent = opponentName;
  } else {
    const playerName = getPlayerName();
    const opponentNameSpan = document.getElementById("opponent-name");
    opponentNameSpan.textContent = playerName;
  }
}

updatePlayerNameSpan();
updateOpponentNameSpan();
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
    const existingPlayerIndex = playerList.findIndex(
      (player) => player.playerName === playerName
    );

    if (existingPlayerIndex !== -1) {
      console.log("Player already exists");
      return playerList[existingPlayerIndex];
    }

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
    if (element != player && element != opponent) {
      flag = false;
    }
  });
  board_full = flag;
};

const check_line = (a, b, c) => {
  return (
    play_board[a] == play_board[b] &&
    play_board[b] == play_board[c] &&
    (play_board[a] == player || play_board[a] == opponent)
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
// if (localStorage.getItem("wins")) {
// } else {
//   const wins = localStorage.setItem("wins", 0);
// }
// if (localStorage.getItem("losses")) {
// } else {
//   const losses = localStorage.setItem("losses", 0);
// }
// if (localStorage.getItem("ties")) {
// } else {
//   const ties = localStorage.setItem("ties", 0);
// }

const check_for_winner = () => {
  let res = check_match();
  if (res == player) {
    winner.innerText = "You Win!";
    winner.classList.add("playerWin");
    board_full = true;
    incrementWins(currentname);
    updateWinsSpan();
  } else if (res == opponent) {
    winner.innerText = "You Lost :(";
    winner.classList.add("computerWin");
    board_full = true;
    incrementLosses(currentname);
    updateLossesSpan();
  } else if (board_full) {
    winner.innerText = "Draw!";
    winner.classList.add("draw");
    incrementTies(currentname);
    updateTiesSpan();
  }
};

const render_board = () => {
  board_container.innerHTML = "";
  play_board.forEach((e, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`;
    if (e == player || e == opponent) {
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
    broadcastEvent(getPlayerName(), moveEvent, e);
    addComputerMove();
  }
};
const handleInput = (selected) => {
  play_board[selected] = opponent;
  game_loop();
};

const addComputerMove = () => {
  if (!board_full) {
    board_full = true;
  }
};
const addOpponentMove = (selected) => {
  play_board[selected] = opponent;
  game_loop();
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

function broadcastEvent(from, type, value) {
  const event = {
    from: from,
    type: type,
    value: value,
  };
  waitForSocketConnection(socket, function () {
    socket.send(JSON.stringify(event));
  });
}
// Make the function wait until the connection is made...
function waitForSocketConnection(socket, callback) {
  setTimeout(function () {
    if (socket.readyState === 1) {
      // console.log("Connection is made")
      if (callback != null) {
        callback();
      }
    } else {
      // console.log("wait for connection...")
      waitForSocketConnection(socket, callback);
    }
  }, 5); // wait 5 milisecond for the connection...
}

//initial render
render_board();

//websocket
socket.onmessage = async (event) => {
  const msg = JSON.parse(await event.data.text());
  if (msg.type === gameStartEvent) {
    const {
      from: name,
      value: { hostName },
    } = msg;
    localStorage.setItem("opponentName", name);
    updateOpponentNameSpan();
    board_full = false;
  } else if (msg.type === moveEvent) {
    addOpponentMove(msg.value);
  } else if (msg.type === messageEvent) {
    appendMsg("friend", msg.from, msg.value);
  } else if (msg.type === gameRestartEvent) {
    reset_board();
  }
};

if (localStorage.getItem("opponentName") === "") {
  broadcastEvent(getPlayerName(), gameHostEvent, { nice: "object" });
} else {
  broadcastEvent(getPlayerName(), gameStartEvent, {
    hostName: getOpponentName(),
  });
}

//CHAT STUFF

// Display that we have opened the webSocket
socket.onopen = (event) => {
  appendMsg("system", "websocket", "connected");
};

// Display messages we receive from our friends
// socket.onmessage = async (event) => {
//   const text = await event.data.text();
//   const chat = JSON.parse(text);
//   appendMsg("friend", chat.name, chat.msg);
// };

// If the webSocket is closed then disable the interface
socket.onclose = (event) => {
  appendMsg("system", "websocket", "disconnected");
  // document.querySelector("#name-controls").disabled = true;
  document.querySelector("#chat-controls").disabled = true;
};

// Send a message over the webSocket
function sendMessage() {
  const msgEl = document.querySelector("#new-msg");
  const msg = msgEl.value;
  if (!!msg) {
    appendMsg("me", "me", msg);
    const name = localStorage.getItem("userName");
    // const name = document.querySelector("#my-name").value;
    broadcastEvent(currentname, messageEvent, msg);
    msgEl.value = "";
  }
}

// Create one long list of messages
function appendMsg(cls, from, msg) {
  const chatText = document.querySelector("#chat-text");
  chatText.innerHTML =
    `<div><span class="${cls}">${from}</span>: ${msg}</div>` +
    chatText.innerHTML;
}

// Send message on enter keystroke
const input = document.querySelector("#new-msg");
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// // Disable chat if no name provided
// const chatControls = document.querySelector('#chat-controls');
// const myName = document.querySelector('#my-name');
// myName.addEventListener('keyup', (e) => {
//   chatControls.disabled = myName.value === '';
// });
