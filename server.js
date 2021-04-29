const express = require("express");
const socket = require("socket.io");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json()); //parses every json
app.use(express.urlencoded({ extended: false }));

let userList = [];


const server = app.listen(PORT, console.log(`server is starting ${PORT}`));

io = socket(server);

io.on("connection", (socket) => {
  console.log("sockets are connected");

  socket.on("join", (data) => {
    socket.join(data.room);
    console.log(`The use joined the room ${data.room}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data.content);
  });

  socket.on("user", (data) => {
    userList.push(data.name)
    io.in(data.room).emit("joined_user", userList);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    

  });
});
