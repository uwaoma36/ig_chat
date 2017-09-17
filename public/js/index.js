var socket=io();
 socket.on('connect',function(){
   console.log("connected to server");
 });
 socket.on('disconnect',function(){
   console.log("user disconnected");
 });

 socket.emit('new',{from:"ig@yahoo.com",
 text:"are u mr bellefuu"
 ,createdAt:12
});

socket.on("newMessage",function(message){
console.log(message);
})