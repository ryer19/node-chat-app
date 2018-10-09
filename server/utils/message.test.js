// const expect = require('expect');

// const { generateMessage } = require('./message');
// const { generateAddressLink } = require('./addressLink')
// describe('generateMessage', () => {
//   it('should generate correct message object', () => {
//     let result = generateMessage('Zike', 'hola');

//     expect(result.text).toBe('hola');
//     expect(result.from).toBe('Zike');

//     expect(typeof result.createdAt).toBe('number');
//     console.log(result)
//     expect(result).toMatchObject({ from: 'Zike', text: 'hola' });
//   })
// })

// describe('createLocationMessage', () => {
//   it('should generate correct location object', () => {
//     let user = 'User';
//     let lat = 10;
//     let long = 20;
//     let addressLink = generateAddressLink(user, lat, long);

//     expect(typeof addressLink.createdAt).toBe('number');
//     expect(addressLink.from).toBe('User');
//     expect(addressLink.text).toBe('https://www.google.com/maps?q=$10,15');
//   })
// })