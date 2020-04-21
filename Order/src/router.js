'use strict';
const express = require('express');
const router = express.Router();
const Queue = require('./Queue');
const Driver = require("./Models/Driver");
const Order = require("./Models/Order");

router.get('/', async (req, res) => {
  const orders = await Order.findAll({order: [['created_at', 'DESC']], include: [{model: Driver, as: 'driver'}]});
  res.render('index', {
    orders: orders,
    APP_MAP_HOST_HOST: process.env.APP_MAP_HOST
  });
});

router.get('/add-order', async (req, res) => {
  const drivers = await Driver.findAll();
  res.render('order_form', {
    drivers: drivers
  });
});

router.post('/add-order', async (req, res) => {
  const orderCreated = await Order.create({
    id_driver: req.body.id_driver,
    destination: req.body.destination,
    status: 'Pending',
  });
  const order = await Order.findByPk(orderCreated.id, {include: [{model: Driver, as: 'driver'}]});
  Queue.publisher('', 'order_created', JSON.stringify(order.toJSON()));
  res.redirect('/');
});

router.get('/drivers', async(req, res) => {
  const drivers = await Driver.findAll({order: [['created_at', 'DESC']]});
  res.render('drivers', {
    drivers: drivers
  });
});

router.get('/add-driver', async (req, res) => {
  res.render('driver_form');
});

router.post('/add-driver', async (req, res) => {
  await Driver.create({
    name: req.body.name,
    color: req.body.color,
  })
  res.redirect('/drivers');
});

module.exports = router;
