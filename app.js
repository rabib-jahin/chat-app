var express=require('express');
var socket=require('socket.io')
var app=express();
let client=0
let online=[]
var port=process.env.PORT||5000;
var server=app.listen(port,()=>{

	console.log("listening");

});
app.use(express.static('public'))

var io=socket(server)

io.on('connection',function(socket){
client++;
	console.log('made socket connection',socket.id )
socket.on('chat',function(data){


io.sockets.emit('chat',data)


})

socket.on('disconnect',()=>{
client--;

})
socket.on('handle',(data)=>{
	if(data.handle!==''){
online.push(data.handle)
console.log(data.handle)}


})
socket.on('get',()=>{

	io.sockets.emit('get',{

clients:client,
on:online

	})
})

socket.on('typing',(data)=>{
socket.broadcast.emit('typing',data)

})
})
