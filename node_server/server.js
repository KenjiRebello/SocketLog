const express = require('express');
const path = require('path');

const PORT = 3000;

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

server.listen(PORT);
console.log("Server is running");

app.use("/", (req, res) => {
  res.render("index.html");
});

io.on('connection', socket => {
  console.log(`Socket Conectado ${socket.id}`);

  socket.on('sendMessage', data => {
    console.log(data);
  });
});