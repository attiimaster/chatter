const express = require("express");
const socket = require("socket.io");
const config = require("./config.js");

let users = [];
const app = express();

app.use((req, res, next) => {
  	res.header('Access-Control-Allow-Origin', '*');
 	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
	res.header("Access-Control-Allow-Credentials", "true");
  	next();
});

setInterval(() => console.log("Connected Users: ", users), 5000);

const server = app.listen(config.port);
console.log("Node listening on " + config.port + ".");

const io = socket(server);

io.use((socket, next) => { console.log("middleware: ", "socket"); next(); });

io.on("connection", (socket) => {
	console.log(socket.id + " connected.");
	users.push(socket.id);
  	io.emit("connection_RES", serverMessage("A user connected...", users));

	socket.on('SEND_MESSAGE_REQ', (data) => {
  		console.log(data);
  		io.emit('SEND_MESSAGE_RES', { ...data, time: Date().slice(16, 24) });
  	})

  	socket.on("TEST_REQ", (data) => {
  		io.emit("TEST_RES", "TEST");
  	})

	socket.on("disconnect", () => {
		console.log(socket.id + " disconnected.");
		const i = users.indexOf(socket.id);
		if (i>-1) { users.splice(i, 1); }
  		io.emit("disconnect_RES", serverMessage("A user disconnected...", users));
	})

	socket.on("error", (err) => {
		console.log("ERROR from socket " + socket.id + ".");
		console.log(err);
	})
})

const serverMessage = (str, users) => {
	const msg = {
		username: "SERVER",
		message: str, 
		time: Date().slice(16, 24),
		users,
	}
	return msg;
}