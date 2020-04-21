#!/bin/sh

npx sequelize db:migrate
pm2-runtime index.js
