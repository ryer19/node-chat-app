const generateAddressLink = (from, coords) => {
  return {
    from,
    text: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
    createdAt: new Date().getTime()
  }
}

module.exports = { generateAddressLink }