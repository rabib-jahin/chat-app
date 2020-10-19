var socket=io.connect()

var message=document.getElementById('message');
handle=document.getElementById('handle');
btn=document.getElementById('send');
//output=document.getElementById('output');
feedback=document.getElementById('feedback');
show=document.getElementById('show');
//part=document.getElementById('participents');
//list=document.getElementById('list');
sethandle=document.getElementById('sethandle');
file=document.getElementById('fileName');
image=document.getElementById('image');
handleDiv=document.getElementById('handlediv')
room=document.getElementById('roomName')
rooms=document.getElementById('rooms')
joinRoom=document.getElementById('joinRoom');
create=document.getElementById("save");
//li=document.getElementById("uList");
leave=document.getElementById("leave");
title=document.getElementById("title")
var div=document.getElementById('chat-window');


let count=0;
let handles=""
let roomVal;
joinRoom.addEventListener('click',()=>{
roomVal=room.value;

m=prompt("Enter the password");
socket.emit('getRooms',{

	room:room.value,
	password:m
});

})
create.addEventListener('click',()=>{
let s;
roomVal=room.value
if(room.value){

		s=prompt("Set a password ");

	}
	else{
		alert("Room with this name can't be created");
	}
socket.emit('room',{

	room:room.value,
	password:s
})

})
sethandle.addEventListener('click',()=>{

if(handle.value==''){
	alert('Please enter your handle');
}
else{
	socket.emit('handle',{
	handle:handle.value,
	room:roomVal
})
handleDiv.style.display='none';
alert("hello "+handle.value+" Welcome to this chat app");
}
})
/*part.addEventListener('click',()=>{

socket.emit('get',room.value)

})*/
btn.addEventListener('click',()=>{
	

	
if(handle.value==''){
	alert('Please enter your handle');

}
else if(message.value==''){
	alert("enter a text");
}
else{
socket.emit('chat',{

	message:message.value,
    handle:handle.value,
    room:roomVal
})
}



message.value=""
message.focus();
})
leave.addEventListener('click',()=>{

socket.emit('dis',roomVal);

location.reload();
})

file.addEventListener('change',(element)=>{
console.log(element)

var file=element.target.files[0];
var reader=new FileReader();
reader.onloadend=function(){
console.log("RESULT",reader.result);
socket.emit('image',{

	result:reader.result,
	handle:handle.value,
	room:roomVal


}

	);
}
reader.readAsDataURL(file);
})

message.addEventListener('keypress',()=>{

	socket.emit('typing',{

		handle:handle.value,
		room:roomVal
	})
})
message.addEventListener('touchstart',()=>{

	socket.emit('typing',{

handle:handle.value,
		room:roomVal

	})
})

socket.on('chat',function(data){
	var div2=document.createElement("div");
div2.classList.add("output");

feedback.innerHTML=""
div2.innerHTML="<p><strong>"+data.handle+":</strong> "+data.message+"</p"
div.appendChild(div2);
div.scrollTop=div.scrollHeight
})
socket.on('typing',(data)=>{

feedback.innerHTML="<p><em>"+data.handle+" is typing...."+"</p></em>"
div.scrollTop=div.scrollHeight

})
/*socket.on('get',(data)=>{
let online=data.on.map((data)=>{
return "<li>"+ data+"</li>" 

}).join('')


	list.innerHTML=online
})*/
socket.on('image',(data)=>{
	var div2=document.createElement("div");
div2.classList.add("output");

if(data.result.includes('/pdf'))
div2.innerHTML="<p><strong>"+data.handle+":</strong>"+"<embed class=\"pdf\" src=\""+data.result+"\"/>"
else
div2.innerHTML="<p><strong>"+data.handle+":</strong>"+"<img class=\"image\" src=\""+data.result+"\"/>"

div.appendChild(div2);
div.scrollTop=div.scrollHeight
})
/*
socket.on('getRooms',data=>{
let online=data.map((datum)=>{
return "<li>"+ datum+"</li>" 

}).join('')

li.innerHTML=online


})*/
socket.on('dis',data=>{
var div2=document.createElement("div");
div2.classList.add("output");
//leave.style.display="none";

feedback.innerHTML=""
div2.innerHTML="<p><strong>"+"Bot"+":</strong> "+data+" has left this room"+"</p"
div.appendChild(div2);
div.scrollTop=div.scrollHeight

})
socket.on('room',data=>{
if(data.id){
	alert("succesfully created the room")
title.innerHTML="Welcome to "+data.room +" Room"
leave.style.display="block";

}
else{
	alert("Can't create")
}
	
})
socket.on('getRooms',data=>{

	if(data.id){
		alert("successfully joined");
		title.innerHTML="Welcome to "+data.room +" Room"
		leave.style.display="block";
	}
	else{

		alert("Can't join.Room doesn't exist")
	}
})

socket.on('handle',data=>{  
var div2=document.createElement("div");
div2.classList.add("output");

feedback.innerHTML=""
div2.innerHTML="<p><strong>"+"Bot"+":</strong> "+data.handle+" has joined this room"+"</p"
div.appendChild(div2);
div.scrollTop=div.scrollHeight


})