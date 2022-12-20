const express = require("express");
const app = express();
const PORT = 4000;
const fns = require("./features/fns.js");

const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

socketIO.on("connection", async (socket) => {
  //додаємо сокетам імена та повертаємо їх на клієнт
  socket.on("chosenName", (data) => {
    socket.data.username = data;

    let userNames = [];
    for (let obj of socketIO.sockets.sockets) {
      userNames.push(obj[1].data.username);
    }
    socketIO.emit("usersList", userNames);
  });

  //порівнюємо обрані елементи
  socket.on("selectedElement", (data) => {
    socket.data.clikedElement = data;

    let chosenElements = [];

    for (let obj of socketIO.sockets.sockets) {
      chosenElements.push(obj[1].data.clikedElement);
    }

    //вказуємо хто з гравців уже обрав елемент або хто виграв
    if (chosenElements.indexOf(undefined) + 1) {
      socketIO.emit(
        "whoSelectedElement",
        fns.whoSelectedElement(chosenElements)
      );
    } else {
      socketIO.emit("whoWinner", fns.checkWinner(chosenElements));
      socketIO.emit("removeSelected", "none");
      for (let obj of socketIO.sockets.sockets) {
        obj[1].data.clikedElement = undefined;
      }
    }
  });

  socket.on("disconnect", () => {
    //прибираємо юзерів що від'єднались і повертаємо новий список імен на клієнт
    let userNames = [];

    for (let obj of socketIO.sockets.sockets) {
      userNames.push(obj[1].data.username);
    }
    socketIO.emit("usersList", userNames);

    //прибираємо обрані раніше елементи
    for (let obj of socketIO.sockets.sockets) {
      obj[1].data.clikedElement = undefined;
    }

    //reset data
    socketIO.emit("whoSelectedElement", fns.whoSelectedElement([]));
    socketIO.emit("removeSelected", "none");
    socketIO.emit("resetScore", "none");
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
