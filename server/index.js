const express = require('express');
const ip = require('ip');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const SoundHelper = require('./sound');
const ScheduleHelper = require('./schedule');

const port = process.env.PORT || 3000;

server.listen(port);

console.log(`Browse to ${ip.address()}:3000 in your device!!`);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.use(express.static(path.resolve(__dirname, '../build')));

io.on('connection', (socket) => {

    console.log('client logged.');

    SoundHelper.getVolume()
        .then((volume) => {
            socket.emit('init_volume', {volume});
        });

    socket.on('change_volume', (data) => {
        (data.volume) ? SoundHelper.setVolume(data.volume)
                     : console.log('volume not exists');
    });

    socket.on('active_schedule', (data) => {
        if (data) {
            ScheduleHelper.active(data);
        }
    });

    socket.on('cancel_schedule', () => {
        ScheduleHelper.cancel();
    });
});