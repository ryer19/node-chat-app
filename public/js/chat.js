const locationButton = document.getElementById('send-location');
const messageSubmit = document.getElementById('messageSubmit');
const target = document.getElementById('message');
var socket = io();

function paramsGetter(uri){
  let url = new URL(uri);
  return {
      name: url.searchParams.get('name'),
      room: url.searchParams.get('room')
  }
}

var newCursorPosition = function (ul) {
  let freshMessage = ul.lastElementChild
  freshMessage.scrollIntoView({behavior: "smooth"})
}
 // CONNECT
socket.on('connect', function () {
  let params = paramsGetter
  (window.location.href);
  socket.emit('join', params, function (err){
    if (err) {
      window.location.href = '/';
    } 
    // else {
    //   console.log('nada')
    // }
  })
});
// DISCONNECT
socket.on('disconnect', function () {
  console.log('disconnected from server')
});
// UPDATE USER LIST
socket.on('updateUserList', function(users){
  const userSideBar = document.getElementById('users');
  if (userSideBar.querySelector('ul')){
    userSideBar.removeChild(userSideBar.childNodes[0])
  }
  let ul = document.createElement('ul');  
  users.forEach((user) => {
    let li = document.createElement('li');
    let textNode = document.createTextNode(`${user}`);
    li.append(textNode)
    ul.appendChild(li)
  })
  userSideBar.append(ul)
})
// NEW MESSAGE
socket.on('newMessage', function (message) {
  const template = document.getElementById('message-template').innerHTML;
  const data = {
    text: message.text,
    from: message.from,
    createdAt: message.createdAt
  }
  const html = Mustache.render(template, data);
  ul = document.getElementById('messages')
  ul.insertAdjacentHTML('beforeend', html);
  newCursorPosition(ul);
});
// NEW LINK MESSAGE
socket.on('newLinkMessage', function (message) {
  const locationTemplate = document.getElementById('location-message-template').innerHTML;
  const locationData = {
    from: message.from,
    url: message.text,
    createdAt: message.createdAt
  }
  const locationHtml = Mustache.render(locationTemplate, locationData);
  ul = document.getElementById('messages')
  ul.insertAdjacentHTML('beforeend', locationHtml);
  newCursorPosition(ul);
});
// EVENT LISTENER - MESSAGE
messageSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  const data = target.value;
  target.value = '';
  socket.emit('createMessage', {
    text: data
  }, function () {
    target.value = ''
  })
});
// EVENT LISTENER - LOCATION
locationButton.addEventListener('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }
  locationButton.disabled = true;
  navigator.geolocation.getCurrentPosition(function (position) {

    locationButton.disabled = false;
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }, function (err) {
    if (JSON.stringify(err) === "{}") {
      alert('You will need to allow geolocation on your browser.  If you are using Safari, go to Settings>>Privacy>>Location Services>>Safari')
    }
  }
  )
})
 // console.log('newCursorPosition Function')
  // let ul = document.getElementById('messages');
  // //let cursorLocation = ul.scrollTop;
  // let clientView = window.innerHeight;
  // console.log(clientView)
  // let scrollHeight = ul.scrollHeight;
  // let messageHeight = 59;
  // let lastMessage = ul.lastElementChild
  // let bottomLastMessage = lastMessage.getBoundingClientRect().bottom;
  
  // let totalHeight = cursorLocation + clientView + messageHeight;
  // let totalHeight = 0;
 
  
  // console.log(`ul: ${JSON.stringify(ul)}, bottomLastMessage: ${bottomLastMessage}, clientView: ${clientView}, scrollHeight: ${scrollHeight}, totalHeight: ${totalHeight}`)
  // if (scrollHeight >= clientView) {
  //   window.scrollTo(0, 230)
  //   console.log('off page')

    // ul.scrollTop = scrollHeight - clientView - messageHeight;

  //}
  //   function paramsGetter(uri){
  //     let url = new URL(uri);
  //     return {
  //         name: url.searchParams.get('name'),
  //         room: url.searchParams.get('room')
  //     }
  // }