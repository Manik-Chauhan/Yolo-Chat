console.log('client side js is running');
const socket = io('https://yolo-chat.netlify.app/')
//const socket = io('http://localhost:3000/')
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageImp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append=(message, position)=>{
	const messageElement = document.createElement('div');
	messageElement.innerText=message;
	messageElement.classList.add('message');
	messageElement.classList.add(position);
	messageContainer.append(messageElement);
	if(position=='left'){
	audio.play();
     }
}

form.addEventListener('submit',(e)=>{
	e.preventDefault();
	const message = messageInput.value;
	append(`You: ${message}`,'right');
	socket.emit('send',message);
	messageInput.value='';
});
const name = prompt("Enter your Name to Join");
socket.emit('new-user-joined',name);

socket.on('user-joined', name =>{
	append(`${name} joined the chat`,'right')
})

socket.on('receive', data =>{
	append(`${data.name}: ${data.message}`,'left')
})

socket.on('left', name =>{
	append(`${name} Left the chat`,'left')
})