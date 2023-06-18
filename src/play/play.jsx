import React, { useState } from "react";
import "./style.css";

export function Play() {
  // Rest of the code...

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
        <div class="players">
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
          <div class="container">
            <h1 style={{ padding: "10px" }}>Play</h1>

            <div class="play-area">
              <div id="block_0" class="block"></div>
              <div id="block_1" class="block"></div>
              <div id="block_2" class="block"></div>
              <div id="block_3" class="block"></div>
              <div id="block_4" class="block"></div>
              <div id="block_5" class="block"></div>
              <div id="block_6" class="block"></div>
              <div id="block_7" class="block"></div>
              <div id="block_8" class="block"></div>
            </div>
            <br />
            <h2 id="winner"></h2>
            <br />
            <button onclick="reset_board(); broadcastEvent(currentname, gameRestartEvent, 'null');">
              Play Again
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "200px",
          }}
        >
          <h1 style={{ padding: "10px" }}>Chat</h1>

          <fieldset id="chat-controls">
            <input id="new-msg" type="text" />
            <button onclick="sendMessage()">Send</button>
          </fieldset>
          <div id="chat-text"></div>
        </div>
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
        Your All Time:
        <br />
        Wins: <span id="wins-id"></span> Ties:
        <span id="ties-id"></span> Losses: <span id="losses-id"></span>
      </div>
    </main>
  );
}

export default Play;
