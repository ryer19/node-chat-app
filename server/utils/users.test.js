const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(()=> {
        users = new Users();
        users.users =[{
            id: 1,
            name: 'Mike',
            room: 'Node Course'
        },{
            id: 2,
            name: 'Jen',
            room: 'React Course'
        },{
            id: 3,
            name: 'Julie',
            room: 'Node Course'
        },
    ]
    })
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Bob',
            room: 'Office'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user])
    })
    it('should return names for Node course', () => {
        let userList = users.getUserList('Node Course');
        console.log(userList)
        expect(userList).toEqual(['Mike', 'Julie']);
    })
    it('should return names for React course', () => {
        let userList = users.getUserList('React Course');
        console.log(userList)
        expect(userList).toEqual(['Jen']);
    })
    it('should remove the user', ()=> {
        const userId = 2;
        const userResults = users.removeUser(userId);

        expect(userResults[0].id).toBe(userId);
        expect(userResults[1].length).toBe(2);
    })
    it('should not remove the user', () => {
        let userId = 99;
        let userResults = users.removeUser(userId);
        expect(userResults[0]).toBeFalsy();
        expect(userResults[1].length).toBe(3);
    })
    it('should find user', () => {
        let userId = 2;
        let user = users.getUser(userId);
        expect(user.id).toBe(userId);
    })
    it('should not find user', () => {
        let userId = 99;
        let user = users.getUser(userId);
       
        expect(user).toBeFalsy();
    })
})