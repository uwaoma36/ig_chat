const path = require('path');
const http=require("http");
const express = require('express');
const socketIo =require("socket.io");
const {generateMessage}=require("./utils/message");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server =http.createServer(app);
app.use(express.static(publicPath));
let io=socketIo(server);

io.on('connection',(socket)=>{
console.log("new User connected");

socket.emit("newMessage",generateMessage('Admin','Welcome to the chat app'));

socket.broadcast.emit("newMessage",generateMessage('Admin','New user joined'));


socket.on("createMessage",(message)=>{
  console.log(message);
  /**io.emit("newMessage",{
    from:message.from,
    text:message.text,
    createdAt:new Date().getTime()
  });**/
socket.broadcast.emit("newMessage",generateMessage(message.from,message.text));



});


socket.on("disconnect",()=>{
console.log("user has disconnected from server");

})

});





server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
