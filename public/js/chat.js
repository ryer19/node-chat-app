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
// var ul = document.getElementById('messages');
// console.log('right after ul defined, ul is: '  + JSON.stringify(ul));


// function renderMustache(t, d, c){
//   console.log('renderMustacheFunction')
//   let html = Mustache.render(t,d)
//   if (typeof c === "function"){
//     c()
//   }
//   console.log(html)
//   return html;
// }
var newCursorPosition = function (ul) {

  let freshMessage = ul.lastElementChild
  freshMessage.scrollIntoView({behavior: "smooth"})

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

  }
//   function paramsGetter(uri){
//     let url = new URL(uri);
//     return {
//         name: url.searchParams.get('name'),
//         room: url.searchParams.get('room')
//     }
// }

socket.on('connect', function () {
  let params = paramsGetter(window.location.href);
  socket.emit('join', params, function (err){
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      // console.log(params)
      console.log('nada')
    }
  })
});

socket.on('disconnect', function () {
  console.log('disconnected from server')
});

socket.on('updateUserList', function(users){
  // console.log(`User's List: ${users}`)
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


locationButton.addEventListener('click', function () {
  // console.log(locationButton.disabled)
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
    } else {
      alert(JSON.stringify(err))
    }
  }
  )
})
