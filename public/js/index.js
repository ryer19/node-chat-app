
var socket = io();
const rooms = [];
socket.on('login', function (data) {
    console.log(`This is the room list data:  ${JSON.stringify(data)}`);
    rooms.push(...data.roomList)
    populateRooms();
});

const roomChoice = document.getElementById('roomChoice');
const customOption = document.getElementById('customOption');
;
const submitButt = document.getElementById('submitForm');

let customInput = document.getElementById('customInput')


function toggleField(hideObj,showObj){
  hideObj.disabled=true;        
  hideObj.style.display='none';
  showObj.disabled=false;   
  showObj.style.display='inline';
  showObj.focus();
  populateRooms();

}
roomChoice.addEventListener('change', function(e){

  let roomSelection = roomChoice.options[roomChoice.selectedIndex].innerHTML;
  if(roomSelection=='[Enter room name]'){
    toggleField(roomChoice,customInput);
    this.selectedIndex='0';
  } else {
    alert('not custom: ' + roomChoice.options[roomChoice.selectedIndex].value)
    console.log("in roomChoice addeventlistener" + roomChoice.options[this.selectedIndex].value)
  }
})



submitButt.addEventListener('click', function(e){
  e.preventDefault();
 
  rooms.push(customInput.value)
  let allInputValues = document.getElementsByTagName('input')
  let fullForm = document.getElementById('fullForm');
  let name = document.getElementById('name');
  fullForm.submit();
  toggleField(customInput, roomChoice);
})

// add rooms to drop down list
function populateRooms(){
  let numberOfOptions = roomChoice.childElementCount;
  let numberOfRooms = rooms.length;
  while (numberOfOptions > 2) {
    roomChoice.lastChild.remove();
    numberOfOptions = roomChoice.childElementCount;
  }
  if (numberOfRooms>0){
    rooms.forEach((room) => {
      let option = document.createElement('option');
      let text = document.createTextNode(room);
      option.append(text);
      insertAfter(option, customOption);
    })
  }
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

populateRooms();
