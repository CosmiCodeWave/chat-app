const http = require ("http");
const express = require ("express");
const path = require("path");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/",(req,res) =>{
return res.sendFile("/public/index.html");
});

io.on('connection', (socket) => {
  socket.on('user-massage', (massage) => {
    console.log(`new user massage` ,massage);
    io.emit(`massage`,massage);
  });
});


const Port = 9000 || process.env.PORT;
server.listen(Port,() => console.log(`server start at port no 9000`));
