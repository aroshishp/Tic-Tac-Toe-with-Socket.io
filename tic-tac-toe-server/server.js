// import { log } from "console";
// import { createServer } from "http";
// import { Server } from "socket.io";
const { createServer } = require("http");
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "http://localhost:5173/"
});

const allUsers = {};

io.on("connection", (socket) => {
  allUsers[socket.id] = {
    socket: socket,
    online: true,
  }

  socket.on("request_to_play", (data) => {
    const currentUser = allUsers[socket.id]
    currentUser.playerName = data.playerName;

    let opponentPlayer;

    for (const key in allUsers) {
      const user = allUsers[key];
      if (user.online && !user.playing && socket.id !== key) {
        opponentPlayer = user;
        break;
      }
    }

    if (opponentPlayer) {
      opponentPlayer.socket.emit("OpponentFound", {
        opponentName: currentUser.playerName
      })

      currentUser.socket.emit("OpponentFound", {
        opponentName: opponentPlayer.playerName
      })

    } else {
      currentUser.socket.emit("OpponentNotFound")
    }
  })

  socket.on("disconnect", function () {
    const currentUser = allUsers[socket.id];
    currentUser.online = false;
  });
});

httpServer.listen(3000);