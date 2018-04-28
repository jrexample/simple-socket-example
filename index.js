const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
    console.log(`App now listening on port ${port}`);
});

app.use(express.static('public'));

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('chat', (name, msg) => {
        io.emit('chat', name, msg);
    });

    socket.on('typing', (name) => {
        socket.broadcast.emit('typing', name);
    });
});