const createSessionId = () => {
  sessionStorage.setItem('1', 'value');
}

module.exports = { createSessionId }