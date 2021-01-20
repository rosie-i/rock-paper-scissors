const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const port = 8080;

// dirname is part of node and points to the current folder of the current module
// i.e. server in this case
const clientPath = `${__dirname}/../client`;
console.log("Serving static files from " + clientPath);

// Serve up our static files
// This is static middleware responsible for serving static files is available out of the box in Express
// We pass it the path of our client
app.use(express.static(clientPath));

// The function that's passed in to createServer is called once for every HTTP request
// that's made against that server, so it's called the request handler.
// 
// The server needs to know what to do when the client connents
// Whenever that happens, express will handle the request
//
// app is both an object and a function so can be passed in as the listener
const server = http.createServer(app);

// This is our socketio server
const io = socketio(server);

// In order to do something with socketio, you need to listen to events
// Whenever something happens in socketio, it will emit an event, just like JS
// e.g. There's an event called connection, when the user connects
io.on("connection", (socket)=>{

    console.log("Someone connected to your server!");


    // The first arg identifies the type of thing you're sending
    // It could be anything - message, turn, etc.
    // Then you pass the data
    // This can also be anything (a string, number, etc.)
    socket.emit("message", "You are now connected to the server! :D");
    // ^ So this will send to each and every newly connected user
    // Then on the client side, we create a corresponding function where we receive this emission


    // So we listen for a message from the client side (which will be sent from the chat form)
    socket.on("message", (text) =>{
        // We get the text of the message and send it back to everyone who is connected
        // Note that to send to ALL connected users we use io.emit
        // Whereas socket.emit will only send to a single client
        // But io.emit sends to everyone who is connected (including current socket)
        io.emit("message", text);
    });




});

// Adding an event-listener called error, in case the server crashes
server.on('error', (err)=>{
    console.error("Server error:", err);
})

server.listen(port, ()=>{
    console.log("RPS started on port " + port);
});