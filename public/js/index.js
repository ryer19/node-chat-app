var socket = io();
socket.on('connect', function () {
  console.log('connected to server')
  // socket.emit('createMessage', {
  //   from: 'Bob',
  //   text: 'whats up?'
  // })
});
socket.on('disconnect', function () {
  console.log('disconnected from server')
});

socket.on('newMessage', function (message) {
  if (message.from === "Admin") {
    return
  } else {
    let ul = document.getElementById('messages');
    let li = document.createElement("li");
    let node = document.createTextNode(message.text);
    li.appendChild(node);
    ul.appendChild(li)
  }
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'hi'
// }, function (str) {
//   console.log(str)
// })

const submitListener = document.getElementById('messageSubmit');
submitListener.addEventListener('click', function (e) {
  e.preventDefault();
  const target = document.getElementById('message');
  const data = target.value;
  console.log(data)
  console.log('message from socket to follow: ')

  socket.emit('createMessage', {
    from: 'User',
    text: data
  }, function () {

  })
  //sendData(data);
})
function sendData(data) {

  var XHR = new XMLHttpRequest();
  //  var FD = new FormData();
  var package = JSON.stringify(data);
  //console.log(`Data: ${JSON.stringify(data)}`)
  // Push our data into our FormData object
  // for (name in data) {
  //   console.log(`name: ${name}`)
  //   FD.append(name, data[name]);
  //   console.log(FD)
  // }

  // Define what happens on successful data submission
  XHR.addEventListener('load', function (event) {
    alert('Yeah! Data sent and response loaded.');
  });

  // Define what happens in case of error
  XHR.addEventListener('error', function (event) {
    alert('Oops! Something went wrong.');
  });

  // Set up our request
  XHR.open('POST', 'https://neverland.free.beeceptor.com');

  // Send our FormData object; HTTP headers are set automatically
  console.log(package)
  XHR.send(package);
}