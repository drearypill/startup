import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";

import "./lobby.css";

export function Lobby({ userName, opponentName, setOpponentName }) {
  const navigate = useNavigate();
  const [opponentList, setOpponentList] = React.useState([]);
  React.useEffect(() => {
    // fetch game list from backend
    fetch("/api/players")
      .then((response) => response.json())
      .then((players) => {
        setOpponentList(players);
        console.log("avalible Games: ", players);
      });
  }, []);

  const onClick = () => {
    localStorage.setItem("opponentName", opponentName);
    setOpponentName(opponentName);
    navigate("/play");
  };
  const onCreate = () => {
    localStorage.setItem("userName", userName);
    localStorage.setItem("opponentName", opponentName);

    setOpponentName(opponentName);
    navigate("/play");
  };

  return (
    <main className="container-fluid">
      <div className="game">
        <div>
          <h1>Create or join a game</h1>
          <div style={{ alignItems: "center" }}>
            <Button className="button" variant="primary" onClick={onCreate}>
              Host new game
            </Button>
            <Form.Select
              className="form-select"
              value={opponentName}
              onChange={(e) => setOpponentName(e.currentTarget.value)}
            >
              <option>Choose a game</option>
              {opponentList.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </Form.Select>
            <Button
              className="button"
              disabled={!opponentName}
              variant="primary"
              onClick={onClick}
            >
              Join game
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
