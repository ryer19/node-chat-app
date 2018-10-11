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
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app)
const io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath))

io.on('connection', (socket) => {


  socket.on('join', (params, callback) => {

    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('name and room name are required');
    }

    
    let room = params.room.toUpperCase();
    let currentUserNames = users.getUserList(room);
    if (currentUserNames.includes(params.name)){
      return callback('that name is currently being used in the room. choose another name')
    }

    socket.join(room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, room);

    io.to(room).emit('updateUserList', users.getUserList(room));

    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${params.name} has connected.`))
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'))

    callback();
  })
  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));



      // io.emit('newMessage', generateMessage(user.name, message.text));
    }

    callback('This is from the server');
  }
  )
  socket.on('createLocationMessage', (data) => {
    // <<<<<<< HEAD
    // =======

    //     io.emit('newLinkMessage', generateAddressLink(data.userName,data.latitude, data.longitude))
    //   })
    // >>>>>>> ecc2c878806586b54eb90d0eb569e914d77d18c7
    let user = users.getUser(socket.id);
    console.log(`user: ${user}`)
    io.emit('newLinkMessage', generateAddressLink(user.name, data.latitude, data.longitude))
  })
  // socket.on('createLocationMessage', (coords) => {
  //   io.emit('newLinkMessage', generateAddressLink('Admin', coords))
  // })
  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
    }
  })

})

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})