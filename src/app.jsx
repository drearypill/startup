import React from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Play } from "./play/play";
import { Lobby } from "./lobby/lobby";
import { About } from "./about/about";
import { AuthState } from "./login/authState";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark">
            <div className="navbar-brand">TicTacToe</div>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="lobby">
                  Lobby
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="play">
                  Play
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="about">
                  About
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/play" element={<Play />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <footer>
          <span className="text-reset">Lily Draper</span>
          <a className="github" href="https://github.com/drearypill/startup">
            Source
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
