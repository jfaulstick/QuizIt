const express = require("express");
const http = require('http');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3001;
const app = express();

// Create server instance
const server = http.createServer(app);

// Create our socket using the instance of the server
const io = socketIO(server);

const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/quizit"
);

// Server side socket.io event configuration
io.on('connection', function(socket){
  console.log('a user connected');
  socket.broadcast.emit('connection', 'a user connected')
  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.broadcast.emit('connection', 'a user disconnected')
  });
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
