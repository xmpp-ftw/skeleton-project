var express = require('express')
  , Emitter = require('primus-emitter')
  , Primus  = require('primus')

var app = express()

app.get('/', function(req, res){
    res.send('Hello World')
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port)
})

var options = {
    transformer: 'socket.io',
    parser: 'JSON',
    transports: [
        'websocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling'
    ]
}

var primus = new Primus(server, options)
primus.use('emitter', Emitter)
primus.save(__dirname + '/public/scripts/primus.js')

primus.on('connection', function(socket) {
    console.log('Websocket connection made')
})

primus.on('disconnection', function(socket) {
    console.log('Client disconnected')
})