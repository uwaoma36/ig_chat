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

socket.on("newLocationMessage",function(message){
  var li=$("<li></li>");
  var a =$("<a target='_blank'>My current Location</a>");
   a.attr("href",message.url);
   li.text(`${message.from}: `);
   li.append(a);
   $("#messages").append(li);

});
//dom grabbing with jquery
$("#message-form").on('submit',function(e){
e.preventDefault();
socket.emit('createMessage',{
  from:"user",
  text:$("[name=message]").val()
},function(){});

});
//implementing the geolocation api
$("#send-location").on("click",function(){

if(!navigator.geolocation){
  return alert("Geolocation not suported by your browser");
}

navigator.geolocation.getCurrentPosition(function(position){
console.log(position);
socket.emit("createLocationMessage",
   {latitude:position.coords.latitude,
  longitude:position.coords.longitude});

},function(){
alert("unable to fecth location");
});

});

