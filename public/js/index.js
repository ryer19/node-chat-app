var socket = io();

socket.on('login', (rooms) => {
    alert(`the following chat rooms are on line: ${rooms.roomList}`)
})

