'use strict';
require('dotenv').config()
const path = require('path');
const express = require('express');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
const router = require('./router');
const Queue = require('./Queue');

class App{

    constructor(){
        this.express = express;
        this.server = server;
        this.http = http;
        this.io = io;


        this.server.use(router);

        this.server.set('views', path.resolve(__dirname, '..', 'templates'));
        this.server.set('view engine', 'ejs');

        this.server.set('views', path.resolve(__dirname, '..', 'templates'));
        this.server.use(this.express.static(path.resolve(__dirname, '..', 'public')));
    }

    start(){
        this.io.on('connection', (socket) => {
            Queue.consume('simulator_order', (msg) => {
                socket.emit('marker', msg);
            });
        });
        this.http.listen(process.env.APP_PORT);
    }
}

module.exports = new App();
