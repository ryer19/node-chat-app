const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
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
  socket.on('createMessage', (message) => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })
  socket.on('disconnect', () => {
    console.log('browser tab closed')
  })

})
// app.get('/', () => {

// })

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})