import React from "react";

export function About() {
  return (
    <main>
      <div className="oneHalfSplit">
        <div className="halfSplit">
          <div id="picture" className="picture-box">
            <img width="300px" src="tic-tac-toe-game.jpeg" alt="random" />
          </div>
        </div>
        <div>
          <h3 className="aboutTitle">About</h3>
          <p>Tic-Tac-Toe is a super fun and easy two player game</p>
          <p>
            Players alternate marking claiming squares on the grid until one
            player claims three in a row or the grid is full
          </p>
          <div id="quote"></div>
        </div>
      </div>
    </main>
  );
}
