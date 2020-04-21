'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const Queue = require('./Queue');
const Order = require("./Models/Order");

class App{

    constructor(){
        this.server = express();

        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());

        this.server.use(router);

        this.server.set('views', path.resolve(__dirname, '..', 'templates'));
        this.server.set('view engine', 'ejs');

        this.server.set('views', path.resolve(__dirname, '..', 'templates'));
        this.server.use(express.static(path.resolve(__dirname, '..', 'public')));
    }

    start(){
        this.server.listen(process.env.APP_PORT, '0.0.0.0');

        Queue.consume('simulation_finished', (msg) => {
          let order = JSON.parse(msg);
          order = Order.findByPk(order.id).then((order) => {
            order.update({
              status: "Finished"
            })
          });
        });
    }
}

module.exports = new App();
