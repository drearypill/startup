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

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body** - Simple and consistent throughout pages
- **Navigation elements** - I have the main title underlined and changed the color for the active tab.
- **Responsive to window resizing** - My app looks great on all window sizes and devices
- **Application elements** - Used good contrast and whitespace
- **Application text content** - Consistent fonts
- **Application images** - Made a cute lil border for the image

## JavaScript deliverable

For this deliverable I made my application functional for the user to input variable assignments which then update the equation.

- **login** - When you click the login button it stores the username takes you to the lobby page.
- **database** - Displayed the user scores of games. Currently this is stored and retrieved from local storage, but it will be replaced with the database data later. Example data for opponents will later be from database
- **WebSocket** - I used delays to asynchronously simulate the opponent's moves. This will be replaced with WebSocket messages later.
- **application logic** - The cpu is currently just picking a random square to play against you with a slight delay.

## Service deliverable

For this deliverable I created an HTTP service to host my frontend and provide backend endpoints.

- **Node.js/Express HTTP service** - done!
- **Static middleware for frontend** - done!
- **Calls to third party endpoints** - I called the random quote 3rd party on the about page
- **Backend service endpoints** - Created list players that stores people you can play with.
- **Frontend calls service endpoints** - I did this using the fetch function.
