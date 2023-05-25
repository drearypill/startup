# TicTacToe

## Description Deliverable

## Elevator Pitch

Have you ever wanted to play TicTacToe with a friend but they love too far away? I am going to build a website that allows users from anywehre to connect and play together. People will be able to create new games and play with friends as well as keep track of winson this site.  

## Design
<img width="490" alt="image" src="https://github.com/drearypill/startup/blob/main/tictactoestartupdeliverable.jpg">

## Key Features

- Secure login over HTTPS
- Ability to select opponent
- Ability to select square to place X or O
- Real time updated display of game board
- Real time display of wins 
- Results are persistently stored

## Technologies
I am going to use the technologes in the following ways

- HTML: Correct HTML structure for applications. Types of pages will be Home, Lobby, Play, Scores, and About
- CSS: Used for styling that looks good on different creen sizes and good use of space and colors
- Javascript: Provides login, selections for gameplay, results/scores, backend endpoint calls
- Service: Backend service with endpoints for login, retrieveing gameplay moves and retrieveing win/losses status
- DB: Store users, wins, and losses in database
- Login: Register and login users. Credentials securely stored in database. Can't play unless authenticated.
- WebSocket: As each user plays, their gameboard is updated for opponent to see
- React: Application ported to use the React web framework.


## HTML deliverable

For this deliverable I added the application structure.

- **HTML pages** - Five HTML pages for Home, Lobby, game Play, Scores, and About.
- **Links** - You can login on the homepage which links to the lobby. Joining or creating a game from lobby links to the game. There's also hyperlinks to each page in the header
- **Text** - There's a text description of the game and text is used to display the current player turn and other instructions
- **Images** - I have an image on the about page of a TicTacToe board I'm not sure if it is neccessary 
- **Login** - Input box and submit button for login.
- **Database** - The total wins and losses are pushed and pulled from database for the scores
- **WebSocket** - The gameboard displays realtime game.

