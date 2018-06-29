var express = require('express')
var app = express()

var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

users= []
connections = []

var PORT = process.env.PORT || 8080

app.get('/',function(req ,res){
    res.sendFile(__dirname+'/index.html')
})

server.listen(PORT,function(){
    console.log('connected at : '+PORT)
})

io.sockets.on('connection', function(socket){
    connections.push(socket)
    console.log('connected '+ connections.length)

    socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket),1)
        console.log('disconnected '+ connections.length)
    })

    socket.on('send message',function(data){
        io.sockets.emit('new message',{msg: data})
    })

})