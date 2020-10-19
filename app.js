var express=require('express');
var socket=require('socket.io');
var fd=require("fs");
var app=express();
let client=0
let online=[]
var port=process.env.PORT||5000;
var rooms=[]
var obj={}
var obj2={}
var id={}

var server=app.listen(port,()=>{

	console.log("listening");

});






app.use(express.static(__dirname+'/public'));




var io=socket(server)

io.on('connection',function(socket){




client++;
	console.log('made socket connection',socket.id )




socket.on('chat',function(data){

room=data.room;
io.sockets.to(data.room).emit('chat',data)


})
socket.on('room',data=>{

    if(data.room!=""&&  obj2&& !(data.room in obj2)  ){
	rooms.push(data.room);
	obj2[data.room]=data.password
	socket.join(data.room);


socket.emit('room',{
	id:1,
	room:data.room
});


}
else{
socket.emit('room',{
	id:0
});	
}







})

socket.on('dis',(data)=>{

client--;
if(id[socket.id]!=null);
socket.to(data).broadcast.emit('dis',id[socket.id])

socket.disconnect();

//obj[data.room].splice(obj[data.room].indexOf(id[socket.id]),1);
console.log(socket.id+" disconnected")

})

socket.on('handle',(data)=>{
online.push(data.handle)
id[socket.id]=data.handle;
console.log(data.handle)
socket.to(data.room).broadcast.emit('handle',data);

})
socket.on('image',(data)=>{
io.sockets.to(data.room).emit('image',data)

 })
socket.on('getRooms',(data)=>{
	if(rooms.includes(data.room) && obj2[data.room]===data.password){
		socket.join(data.room);
		socket.emit('getRooms',{

			room:data.room,
			id:1
		})
	}
	else
		socket.emit('getRooms',{
			id:0
		});

})
/*socket.on('get',(data)=>{

	socket.emit('get',{

clients:client,
on:online,
room:data

	})
})
*/
socket.on('typing',(data)=>{
socket.to(data.room).broadcast.emit('typing',data)

})


})
