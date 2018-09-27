const moment = require('moment');
const generateMessage = (from, text) => {
  // const createSessionId = () => {
  //   sessionStorage.setItem('1', 'value');
  // }
  //console.log(`cSI is a ${typeof createSessionId}`)
  const time = new Date().getTime()
  
  const formattedTime = moment(time).format("h:mm:ss a");
  console.log(formattedTime)
  return {
    from,
    text,
    createdAt: formattedTime
  };
};

module.exports = { generateMessage };