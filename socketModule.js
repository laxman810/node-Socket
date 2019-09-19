
module.exports.socketEmit = function (request) {

    try {
        request.io.sockets.connected[request.socketId].emit(request.listner, request.message);
    } catch (err) {
        console.log('emit failed : ' + err);
    }
    return 1;
}


module.exports.socketBroadcast = function (request) {
    console.log(request)
    try {
        request.socket.broadcast.emit(request.listner, request.message);
    } catch (err) {
        console.log('emit failed : ' + err);
    }
    return 1;
}