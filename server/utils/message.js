const moment = require('moment');
const generateMessage = (from, text) => {
  const time = new Date().getTime()
  const formattedTime = moment(time).format("h:mm:ss a");
  return {
    from,
    text,
    createdAt: formattedTime
  };
};

module.exports = { generateMessage };