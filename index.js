var express = require('express');
var app = express();
var server = require('http').createServer(app).listen(1234);
var io = require('socket.io').listen(server);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var socketModule = require('./socketModule');

var sockgods;
io.on('connection', function (socket) {
    sockgods = socket;
    sockgods.on('channelName', function (data) {
        console.log('got this Data from channelName : ');
        console.log(JSON.stringify(data));
    }); 
});


//publish data to  perticular user to  his socket id
app.post('/socketEmit', (req, res) => {

    var channelName = "channelName";
    var message = {
        author: 'Laxman',
        mobile: '8050093155',
        email: 'laxman810@gmail.com'
    }
    socketModule.socketEmit({
        io: io,
        listner: channelName,
        message: message,
        socketId: "socketId"
    });
    res.send({err: 0, data: "success"});
});

// send  data to  all user  who  are  subscribing to that channel
app.post('/socketBroadcast', (req, res) => {

    var channelName = "channelName";
    var message = {
        author: 'Laxman',
        mobile: '8050093155',
        email: 'laxman810@gmail.com'
    }
    socketModule.socketBroadcast({
        socket: sockgods,
        listner: channelName,
        message: message
    });

    res.send({err: 0, data: "success"});
});



console.log('server listening on port 1234');