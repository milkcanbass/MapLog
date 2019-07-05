const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./utlis/users");

const { generateMessage, generateLocation } = require("./utlis/messages");

//Http server setup
const server = http.createServer(app);

//Socket.io setup
const socketio = require("socket.io");
const io = socketio(server);

//check badwords
const Filter = require("bad-words");

//middleware
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

//open socket when user access the page
io.on("connection", socket => {
  console.log("New WebSocket connection");

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    socket.emit("message", generateMessage("welcome"));

    //broad cast other users when new user access
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(`${user.username} has joined ${room}`));

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(user);

    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed!");
    }

    io.to(user.room).emit("message", generateMessage(message, user.username));
    callback();
  });

  //receive location data
  socket.on("sendLocation", ({ latitude, longitude } = coords, cb) => {
    const user = getUser(socket.id);

    io.to(user.room).emit(
      "locationMessage",
      generateLocation(user.username, latitude, longitude)
    );
    cb();
  });

  //Announcement when user leave page
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage(`${user.username} has left`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
