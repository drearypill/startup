import React from "react";

export function About() {
  const [quote, setQuote] = React.useState("Loading...");
  const [quoteAuthor, setQuoteAuthor] = React.useState("unknown");

  React.useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setQuoteAuthor(data.author);
      })
      .catch();
  }, []);
  return (
    <main>
      <div className="oneHalfSplit">
        <div className="halfSplit">
          <div id="picture" class="picture-box">
            <img
              style={{
                backgroundColor: "white",
                borderRadius: 24,
              }}
              width="300px"
              src="https://play-lh.googleusercontent.com/IrkV8sl4ixD2BLJ0PHYUlMfldcG1DiYutbbtqnLg6fgyAjF9lsq_Be0UgmNmMhR2VA"
              alt="random"
            />
          </div>
        </div>
        <div>
          <h3 className="aboutTitle">About</h3>
          <p>Tic-Tac-Toe is a super fun and easy two player game</p>
          <p>
            Players alternate marking claiming squares on the grid until one
            player claims three in a row or the grid is full
          </p>
          <div className="quote-box ">
            <p className="quote">{quote}</p>
            <p className="author">{quoteAuthor}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
