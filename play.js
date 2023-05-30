async function getPlayerName() {
  const storageName = await localStorage.getItem("userName");
  return storageName ?? "Mystery player";
}
async function getOpponentName() {
  const storageoName = await localStorage.getItem("opponentName");
  return storageoName ?? "Mystery player";
}

async function updatePlayerNameSpan() {
  const playerName = await getPlayerName();
  const playerNameSpan = document.getElementById("player-name");
  playerNameSpan.textContent = playerName;
}
async function updateOpponentNameSpan() {
  const opponentName = await getOpponentName();
  const opponentNameSpan = document.getElementById("opponent-name");
  opponentNameSpan.textContent = opponentName;
}
async function updateWins() {
  const opponentName = await getOpponentName();
  const Wins = document.getElementById("opponent-name");
  opponentNameSpan.textContent = opponentName;
}

updatePlayerNameSpan();
updateOpponentNameSpan();
