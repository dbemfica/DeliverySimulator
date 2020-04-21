'use strict';
var express = require('express');
var router = express.Router();

router.get('/:id', (req, res) => {
  res.render('index', {
    order_id: req.params.id,
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
    GOOGLE_MAPS_START_LAT: process.env.GOOGLE_MAPS_START_LAT,
    GOOGLE_MAPS_START_LNG: process.env.GOOGLE_MAPS_START_LNG
  });
});

module.exports = router;
