

const writeEvent = (text) =>{
    // Selects our <ul> element in index.html
    const parent = document.querySelector("#events")
    
    // Create a new list item to append to the unordered list
    const newItem = document.createElement("li");
    newItem.innerHTML = text;
    
    parent.appendChild(newItem);
    
}


const onChatFormSubmitted = (ev) => {
    ev.preventDefault();

    // Get value of text in input field
    const input = document.querySelector("#chat-input");
    const text = input.value;

    // Clear text input field
    input.value = "";

    socket.emit("message", text);

};

writeEvent("Welcome to Rock Paper Scissors");

// On the client side we have a global object (thanks to importing the socket.io.js script in index.html)
// By default, io will know where it is coming from - it will connect to the same server you're running 

const socket = io();

// We can use socket the same way as in server.js
// socket.on listens for events and then calls the event handler when they occur
// We don't pass writeEvent any parameters because that would immediately invoke the function
// But because it has one arg it will automatically get the event's data, I think?
socket.on("message", writeEvent);

document.querySelector("#chat-form").addEventListener("submit", onChatFormSubmitted);