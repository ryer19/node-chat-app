class Rooms {
    constructor () {
        this.rooms = []
    }
    addRoom (id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user
    }
    removeRoom(id){
        let user = this.getUser(id);
        
        if (user) {
            this.users = this.users.filter((user) => user.id !== id)
        }
        
        return user
    }
    // getRoom(id){
    //     return this.users.filter( user => user.id === id)[0]
    // }
    getRoomList(){
        return this.rooms;
    }
}


module.exports = { Rooms };