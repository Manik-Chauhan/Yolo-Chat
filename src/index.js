// WIll handle socket io connections
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 8888
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
const users= {};

io.on('connection', socket=>{
	socket.on('new-user-joined', name =>{
		users[socket.id] = name;
		socket.broadcast.emit('user-joined',name);
	});
	socket.on('send',message=>{
		socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
	});


	socket.on('disconnect',message=>{
		socket.broadcast.emit('left',users[socket.id]);
		delete users[socket.id];
	});

})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})