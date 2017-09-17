var socket=io();
 socket.on('connect',function(){
   console.log("connected to server");
 });

 socket.on('disconnect',function(){
   console.log("user disconnected");
 });

 

socket.on("newMessage",function(message){
console.log(message);
var li=$('<li></li>').text(`${message.from}:${message.text}`);
$('#messages').append(li);
});

//dom grabbing with jquery
$("#message-form").on('submit',function(e){
e.preventDefault();
socket.emit('createMessage',{
  from:"user",
  text:$("[name=message]").val()
},function(){});


});