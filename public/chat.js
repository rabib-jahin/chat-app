var socket=io.connect()

var message=document.getElementById('message');
handle=document.getElementById('handle');
btn=document.getElementById('send');
output=document.getElementById('output');
feedback=document.getElementById('feedback');
show=document.getElementById('show');
part=document.getElementById('participents');
list=document.getElementById('list');
sethandle=document.getElementById('sethandle');
var div=document.getElementById('chat-window');
let count=0;
let handles=""



sethandle.addEventListener('click',()=>{
socket.emit('handle',{
	handle:handle.value
})

})
part.addEventListener('click',()=>{

socket.emit('get')

})
btn.addEventListener('click',()=>{
	

	

socket.emit('chat',{

	message:message.value,
    handle:handle.value
})




message.value=""
})

message.addEventListener('keypress',()=>{

	socket.emit('typing',handle.value)
})
message.addEventListener('touchstart',()=>{

	socket.emit('typing',handle.value)
})

socket.on('chat',function(data){
feedback.innerHTML=""
output.innerHTML+="<p><strong>"+data.handle+":</strong> "+data.message+"</p"
div.scrollTop=div.scrollHeight
})
socket.on('typing',(data)=>{

feedback.innerHTML="<p><em>"+data+" is typing...."+"</p></em>"
div.scrollTop=div.scrollHeight

})
socket.on('get',(data)=>{
let online=data.on.map((data)=>{
return "<li>"+ data+"</li>"

}).join('')

	show.innerHTML="<p> "+ data.clients+" joined </p>"
	list.innerHTML=online
})
