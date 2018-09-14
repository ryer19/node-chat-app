const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app)
const io = socketIO(server);
app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('new user connected')
  // socket.emit('newEmail', {
  //   from: 'bsmilesjr@gmail.com',
  //   text: 'Hey'
  // });
  // socket.emit('newMessage', {
  //   from: 'abe',
  //   text: 'four score',
  //   createdAt: new Date()
  // })
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'))
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'))

  socket.on('createMessage', (message) => {
    io.emit('newMessage', generateMessage(message.from, message.text))

    // socket.emit emits message to a single connection
    // io.emit emits message to all connections
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  })
  socket.on('disconnect', () => {
    console.log('browser tab closed')
  })

})

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})