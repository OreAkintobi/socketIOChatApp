// Includes modules and files required
var express = require("express");

// creates app, server and socket variables
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

// creates empty lists to store active users and connections
var users = [];
var connections = [];

// runs server
server.listen(process.env.PORT || 3000);
console.log("Server running....");

// creates route to home page so as to serve index file to our app
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// defines connect/disconnect behavior
io.sockets.on("connection", function(socket) {
  // Connect Behavior
  connections.push(socket);
  console.log("Connected: %s socket(s) connected", connections.length);

  // Disconnect
  socket.on("disconnect", function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected: %s socket(s) connected", connections.length);
  });

  // Message
  socket.on("send message", function(data) {
    io.sockets.emit("new message", { msg: data });
  });
});
