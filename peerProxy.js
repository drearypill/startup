const { WebSocketServer } = require("ws");
const uuid = require("uuid");

const messageEvent = "message";
const moveEvent = "move";
const gameStartEvent = "gameStart";
const gameHostEvent = "gameHost";
const gameEndEvent = "gameEnd";
const gameErrorEvent = "gameError";

// Keep track of all the connections so we can forward messages
let connections = [];
const games = new Map();
const verbose = false;

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit("connection", ws, request);
    });
  });

  wss.on("connection", (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on("message", async function message(data) {
      const msg = JSON.parse(data.toString());
      console.log(msg);
      if (verbose) console.log({ msg });
      if (msg.type === gameEndEvent) {
        games.delete(connection.game);
        connection.game = undefined;
      } else if (msg.type === gameHostEvent) {
        const { from: name } = msg;
        connection.name = name;
        connection.game = name;
        games.set(name, { players: [connection] });
      } else if (msg.type === gameStartEvent) {
        const {
          from: name,
          value: { hostName },
        } = msg;
        connection.name = name;
        connection.game = hostName;
        try {
          (games.has(hostName) && games.get(hostName).players.length === 1) ||
            1 / 0;
          games.get(hostName).players[0].ws.send(data);
          games.get(hostName).players.push(connection);
        } catch (e) {
          console.log(e);
          connection.game = undefined;
          connection.ws.send(
            JSON.stringify({
              from: "server",
              type: gameErrorEvent,
              value: { message: "Game not found" },
            })
          );
        }
      } else if (msg.type === moveEvent) {
        games.get(connection.game)?.players?.forEach((c) => {
          if (c.id !== connection.id) {
            c.ws.send(data);
          }
        });
      } else if (msg.type === messageEvent) {
        games.get(connection.game)?.players?.forEach((c) => {
          if (c.id !== connection.id) {
            c.ws.send(data);
          }
        });
      }
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on("close", () => {
      connections.findIndex((o, i) => {
        if (o.id === connection.id) {
          connections.splice(i, 1);
          return true;
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    ws.on("pong", () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

function activeplayers() {
  const activeplayerslist = [];
  console.log(connections);
  for (const connection of connections) {
    if (connection.game && games.get(connection.game)?.players?.length === 1)
      activeplayerslist.push(connection.game);
  }
  console.log(activeplayerslist);
  return activeplayerslist;
}
module.exports = { peerProxy, activeplayers };
