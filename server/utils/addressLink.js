const moment = require('moment');
const generateAddressLink = (username, latitude, longitude) => {
  const formattedTime2 = moment(new Date().getTime()).format("h:mm:ss a"); 
  return {
    from: username,
    text: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: formattedTime2
  }
}

module.exports = { generateAddressLink }

// const moment = require('moment');
// const generateAddressLink = (from, coords) => {
//   const formattedTime2 = moment(new Date().getTime()).format("HH:mm:ss a"); 

//   return {
//     from,
//     text: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
//     createdAt: formattedTime2
//   }
// }

// module.exports = { generateAddressLink }