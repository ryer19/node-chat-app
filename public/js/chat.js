const locationButton = document.getElementById('send-location');
const messageSubmit = document.getElementById('messageSubmit');
const target = document.getElementById('message');
var socket = io();

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


socket.on('connect', function () {
  console.log('connected to server')
});

socket.on('disconnect', function () {
  console.log('disconnected from server')
});

socket.on('newMessage', function (message) {
  const template = document.getElementById('message-template').innerHTML;

  const data = {
    text: message.text,
    from: message.from,
    createdAt: message.createdAt
  }
  // function callback(html){
  //   console.log('calledback')
  //   ul=document.getElementById('messages');
  //   ul.insertAdjacentHTML('beforeend', html);
  //   console.log(ul)
  //   newCursorPosition();
  // }
  //renderMustache(template, data, callback);
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

  // let li = document.createElement("li");
  // let alink = document.createElement("a");
  // let linkText = document.createTextNode("Here I am")
  // alink.appendChild(linkText)
  // let title = document.createAttribute("title");
  // title.value = "location link"
  // alink.setAttributeNode(title)
  // let href = document.createAttribute("href");
  // href.value = message.text;
  // alink.setAttributeNode(href);
  // let target = document.createAttribute("target")
  // target.value = "_blank"
  // alink.setAttributeNode(target)
  // let textNode = document.createTextNode(`${message.from}:`);
  // li.appendChild(textNode);
  // li.appendChild(alink)
  // ul.appendChild(li)
});

messageSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  const data = target.value;
  target.value = '';
  let userData = JSON.parse(sessionStorage.getItem('user'));
  socket.emit('createMessage', {
    from: userData.username,
    text: data
  }, function () {
    target.value = ''
  })
});


locationButton.addEventListener('click', function () {
  console.log(locationButton.disabled)
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }
  locationButton.disabled = true;
  navigator.geolocation.getCurrentPosition(function (position) {
    let userData = JSON.parse(sessionStorage.getItem('user'));
    locationButton.disabled = false;
    socket.emit('createLocationMessage', {
      userName: userData.username,
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
