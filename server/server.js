const express = require('express');
//import express from 'express'
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const moment = require('moment');
const { generateMessage } = require('./utils/message');
const { createSessionId } = require('./utils/session');
const { generateAddressLink } = require('./utils/addressLink')
const { isRealString } = require('./utils/validation')
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app)
const io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath))

io.on('connection', (socket) => {


  socket.on('join', (params, callback) => {

    if (!isRealString(params.name)|| !isRealString(params.room)){
      return callback('name and room name are required');
    }


    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has connected.`))
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'))
  
    callback();
  })
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
    let user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
    }
  })

})

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})