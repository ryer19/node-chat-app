const generateMessage = (from, text) => {
  // const createSessionId = () => {
  //   sessionStorage.setItem('1', 'value');
  // }
  //console.log(`cSI is a ${typeof createSessionId}`)
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

module.exports = { generateMessage };