function paramsGetter(uri){
    let url = new URL(uri);
    return {
        name: url.searchParams.get('name'),
        room: url.searchParams.get('room')
    }
}