const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let result = generateMessage('Zike', 'hola');

    //     name: 'Bob',
    //     age: 50
    //   })
    // expect({
    //   name: 'Zike',
    //   text: 'hola'
    // })
    // result.name).toBe('Zike');
    expect(result.text).toBe('hola');
    expect(result.from).toBe('Zike');
    // expect(result.createdAt).toBeA('number');
    expect(typeof result.createdAt).toBe('number');
    console.log(result)
    expect(result).toMatchObject({ from: 'Zike', text: 'hola' });
  })
})