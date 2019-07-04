const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

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
  const initialMessage = "Welcome";
  socket.emit("message", initialMessage);

  //broad cast other users when new user access
  socket.broadcast.emit("message", "A new user has joined");

  socket.on("sendMessage", (message, cb) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return cb("Profanity is not allowed");
    }

    io.emit("message", message);
    cb("delivered");
  });

  //receive location data
  socket.on("sendLocation", (coords, cb) => {
    io.emit(
      "locationMessage",
      `http://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    cb();
  });

  //Announcement when user leave page
  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
