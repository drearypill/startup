import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const protocol = window.location.protocol === "http:" ? "ws" : "wss";
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
const messageEvent = "message";
const moveEvent = "move";
const gameStartEvent = "gameStart";
const gameEndEvent = "gameEnd";
const gameHostEvent = "gameHost";
const gameRestartEvent = "gameRestart";

function broadcastEvent(from, type, value) {
  const event = {
    from: from,
    type: type,
    value: value,
  };
  console.log("broadcast ", event);

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

export function Play() {
  // const [playerList, setPlayerList] = useState([]);

  const [msg, setmsg] = useState("");
  const [player, setPlayer] = useState("");
  const [opponent, setOpponent] = useState("");
  const [playerName, setPlayerName] = useState();
  const [opponentName, setOpponentName] = useState();
  const [playBoard, setPlayBoard] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [boardFull, setBoardFull] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  const winner = useRef();
  const board_container = useRef();
  const [winsNumber, setWinsNumber] = useState(0);
  const [lossesNumber, setLossesNumber] = useState(0);
  const [tiesNumber, setTiesNumber] = useState(0);

  // async function createPlayer(playerName) {
  //   try {
  //     const existingPlayerIndex = playerList.findIndex(
  //       (player) => player.playerName === playerName
  //     );

  //     if (existingPlayerIndex !== -1) {
  //       console.log("Player already exists");
  //       return playerList[existingPlayerIndex];
  //     }

  //     // Create the player object with scores set to 0
  //     const player = {
  //       playerName: playerName,
  //       wins: 0,
  //       losses: 0,
  //       ties: 0,
  //     };

  //     // Add the player object to the playerList
  //     var temparray = playerList;
  //     temparray.push(player);
  //     console.log("temparray ", temparray);

  //     setPlayerList([...temparray]);

  //     // Save the updated player list to localStorage
  //     savePlayerList();

  //     return player;
  //   } catch (error) {
  //     console.error("Error creating player:", error);
  //     throw error;
  //   }
  // }

  // function savePlayerList() {
  //   localStorage.setItem("playerList", JSON.stringify(playerList));
  // }
  function getPlayerName() {
    const storageName = localStorage.getItem("userName");
    return storageName ?? "Mystery player";
  }
  function getOpponentName() {
    const storageoName = localStorage.getItem("opponentName");
    return storageoName ?? "Mystery player";
  }
  var tempOpponentName = getOpponentName();
  var tempPlayerName = getPlayerName();
  useEffect(() => {
    function getPlayerName() {
      const storageName = localStorage.getItem("userName");
      return storageName ?? "Mystery player";
    }
    function getOpponentName() {
      const storageoName = localStorage.getItem("opponentName");
      return storageoName ?? "Mystery player";
    }
    var tempOpponentName = getOpponentName();
    var tempPlayerName = getPlayerName();

    if (!localStorage.getItem("opponentName")) {
      broadcastEvent(tempPlayerName, gameHostEvent, { nice: "object" });
    } else {
      broadcastEvent(tempPlayerName, gameStartEvent, {
        hostName: tempOpponentName,
      });
    }
    setOpponentName(tempOpponentName);
    setPlayerName(tempPlayerName);
    console.log(tempPlayerName);
    // createPlayer(tempPlayerName);

    if (!localStorage.getItem("opponentName")) {
      setPlayer("X");
      setOpponent("O");
    } else {
      setPlayer("O");
      setOpponent("X");
    }
  }, []);
  socket.onmessage = async (event) => {
    //ask jackson if this stuff needs reformatting
    function convertBlobToJson(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (event) {
          const blobContent = event.target.result;

          try {
            const parsedJSON = JSON.parse(blobContent);
            resolve(parsedJSON);
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = function (event) {
          reject(new Error("Error occurred while reading the Blob."));
        };

        reader.readAsText(blob);
      });
    }
    function isBlob(variable) {
      return variable instanceof Blob;
    }

    // console.log("message: ", event);

    var msg = await event.data;
    if (isBlob(msg)) {
      msg = await convertBlobToJson(msg);
    }
    console.log("start message: ", msg);

    if (msg.type === gameStartEvent) {
      const {
        from: name,
        value: { hostName },
      } = msg;
      localStorage.setItem("opponentName", name);

      // updateOpponentNameSpan();
      setCanPlay(true);
    } else if (msg.type === moveEvent) {
      console.log("move event");
      addOpponentMove(msg.value);
    } else if (msg.type === messageEvent) {
      appendMsg("friend", msg.from, msg.value);
    } else if (msg.type === gameRestartEvent) {
      reset_board();
    }
  };

  const addOne = (x) => {
    return x + 1;
  };

  const check_line = (a, b, c) => {
    return (
      playBoard[a] == playBoard[b] &&
      playBoard[b] == playBoard[c] &&
      (playBoard[a] == player || playBoard[a] == opponent)
    );
  };
  useEffect(() => {
    const check_match = () => {
      for (let i = 0; i < 9; i += 3) {
        if (check_line(i, i + 1, i + 2)) {
          return playBoard[i];
        }
      }
      for (let i = 0; i < 3; i++) {
        if (check_line(i, i + 3, i + 6)) {
          return playBoard[i];
        }
      }
      if (check_line(0, 4, 8)) {
        return playBoard[0];
      }
      if (check_line(2, 4, 6)) {
        return playBoard[2];
      }
      return "";
    };
    let res = check_match();
    if (res == player && player) {
      winner.current.innerText = "You Win!";
      winner.current.classList.add("playerWin");
      setCanPlay(false);
      setWinsNumber(addOne);
    } else if (res == opponent && opponent) {
      winner.current.innerText = "You Lost :(";
      winner.current.classList.add("computerWin");
      setCanPlay(false);
      setLossesNumber(addOne);
      // incrementLosses(currentname);
      // updateLossesSpan();
    } else if (boardFull) {
      winner.current.innerText = "Draw!";
      winner.current.classList.add("draw");
      setTiesNumber(addOne);
      setCanPlay(false);

      // incrementTies(currentname);
      // updateTiesSpan();
    }
    const check_board_complete = () => {
      let flag = true;
      playBoard.forEach((element) => {
        if (element != player && element != opponent) {
          flag = false;
        }
      });
      setBoardFull(flag);
    };
  }, [player, boardFull, playBoard]);

  // const game_loop = () => {
  //   // render_board();
  //   check_board_complete();
  //   // check_for_winner();
  // };

  useEffect(() => {
    // const render_board = () => {
    //   // board_container.innerHTML = "";
    //   playBoard.forEach((e, i) => {
    //     board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${playBoard[i]}</div>`;
    //     if (e == player || e == opponent) {
    //       document.querySelector(`#block_${i}`).classList.add("occupied");
    //     }
    //   });
    // };
    // render_board();
    // game_loop();
  }, [playBoard]);

  const addPlayerMove = (e) => {
    if (!boardFull && playBoard[e] == "") {
      setPlayBoard((prev) => {
        prev[e] = player;
        console.log(prev);

        return JSON.parse(JSON.stringify(prev));
      });
      // game_loop();
      broadcastEvent(tempPlayerName, moveEvent, e);
      addComputerMove();
    }
  };
  console.log("playBoard: ", playBoard);
  console.log("opponent: ", opponent);
  console.log("player:", player);

  const handleInput = (selected) => {
    playBoard[selected] = opponent;
    // game_loop();
  };

  const addComputerMove = () => {
    setCanPlay(false);
  };
  const addOpponentMove = (selected) => {
    console.log("addOpponentMove", selected);
    console.log("opponent in addOpponentMove: ", opponent);
    var tempPlayBoard = playBoard;
    tempPlayBoard[selected] = opponent;
    setPlayBoard(JSON.parse(JSON.stringify(tempPlayBoard)));
    setCanPlay(true);

    // game_loop();
  };

  const reset_board = () => {
    setPlayBoard(["", "", "", "", "", "", "", "", ""]);
    setCanPlay(true);
    winner.current.classList.remove("playerWin");
    winner.current.classList.remove("computerWin");
    winner.current.classList.remove("draw");
    winner.current.innerText = "";
    // render_board();
  };

  return (
    <main>
      <div
        style={{
          width: "100%",
          padding: "24px",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <div className="players">
          <p>
            Player X:
            <span id="player-name"></span>
          </p>
        </div>
        <div>
          Player O:
          <span id="opponent-name"></span>
        </div>
      </div>

      <br />

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ width: "200px", minWidth: "200px" }}>
          <div className="container">
            <h1 style={{ padding: "10px" }}>Play</h1>

            <div className="play-area">
              {playBoard.map((item, index) => {
                return (
                  <div
                    key={index}
                    id={`block_${index}`}
                    onClick={() => {
                      if (!canPlay) return;
                      addPlayerMove(index);
                    }}
                    className="block"
                  >
                    {item == undefined ? "U" : item}
                  </div>
                );
              })}
            </div>
            <br />
            <h2 ref={winner}></h2>
            <br />
            <button
              onClick={() => {
                reset_board();
                broadcastEvent(tempPlayerName, gameRestartEvent, "null");
              }}
            >
              Play Again
            </button>
          </div>
        </div>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "200px",
          }}
        >
          <h1 style={{ padding: "10px" }}>Chat</h1>

          <fieldset id="chat-controls">
            <input
              id="new-msg"
              type="text"
              value={msg}
              onChange={(newMsg) => {}}
              //setmsg(newMsg.value)
            />
            <button onClick={() => {}}>Send</button>
          </fieldset>
          <div id="chat-text"></div>
        </div> */}
      </div>
      <div
        style={{
          textAlign: "center",
          height: "80px",
          width: "100%",
          color: "white",
          paddingTop: "25px",
          paddingBottom: "25px",

          alignItems: "center",
        }}
      >
        Your Scores:
        <br />
        Wins: {winsNumber} Ties:
        {tiesNumber} Losses: {lossesNumber}
      </div>
    </main>
  );
}

export default Play;
