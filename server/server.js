const path = require('path');
const http=require("http");
const express = require('express');
const socketIo =require("socket.io");


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server =http.createServer(app);
app.use(express.static(publicPath));
let io=socketIo(server);

io.on('connection',(socket)=>{
console.log("new User connected");

socket.on("disconnect",()=>{
console.log("user has disconnected from server");

})

});





server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
