const locationButton = document.getElementById('send-location');
const submitListener = document.getElementById('messageSubmit');
const target = document.getElementById('message');
var socket = io();
var ul = document.getElementById('messages');

socket.on('connect', function () {
  console.log('connected to server')
});

socket.on('disconnect', function () {
  console.log('disconnected from server')
});

socket.on('newMessage', function (message) {
  let li = document.createElement("li");
  let node = document.createTextNode(`${message.createdAt}: ${message.from}: ${message.text}`);
  li.appendChild(node);
  ul.appendChild(li)
});

socket.on('newLinkMessage', function (message) {
  let li = document.createElement("li");
  let alink = document.createElement("a");
  let linkText = document.createTextNode("Here I am")
  alink.appendChild(linkText)
  let title = document.createAttribute("title");
  title.value = "location link"
  alink.setAttributeNode(title)
  let href = document.createAttribute("href");
  href.value = message.text;
  alink.setAttributeNode(href);
  let target = document.createAttribute("target")
  target.value = "_blank"
  alink.setAttributeNode(target)
  let textNode = document.createTextNode(`${message.from}:`);
  li.appendChild(textNode);
  li.appendChild(alink)
  ul.appendChild(li)
});

submitListener.addEventListener('click', function (e) {
  e.preventDefault();
  const data = target.value;
  target.value = ''
  console.log(data)
  socket.emit('createMessage', {
    from: 'User',
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
