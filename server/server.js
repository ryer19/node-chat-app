const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const moment = require('moment');
const { generateMessage } = require('./utils/message');
const { createSessionId } = require('./utils/session');
const { generateAddressLink } = require('./utils/addressLink')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app)
const io = socketIO(server);


app.use(express.static(publicPath))

io.on('connection', (socket) => {

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user connected'))

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'))

  socket.on('createMessage', (message, callback) =>
   {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
   }
  )
  socket.on('createLocationMessage', (data) => {

    io.emit('newLinkMessage', generateAddressLink(data.userName,data.latitude, data.longitude))
  })

  socket.on('disconnect', () => {
    socket.emit(
      'newMessage', generateMessage('Admin', 'A user has left the chat'))
  })

})

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})