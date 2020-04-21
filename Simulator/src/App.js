'use strict';
const path = require('path');
const fs = require('fs');
const Queue = require('./Queue');

class App{
    start(){
        Queue.consume('order_created', async(msg) => {
          const order = JSON.parse(msg);
          let destination = await this.readFile(order.destination);
          destination.pop();
          let i = 0;
          let interval = setInterval(() => {
            let simulation = JSON.stringify({
              id_order: order.id,
              current_lat: destination[i].lat,
              current_lng: destination[i].lng,
              target_name: order.destination,
              target_lat: destination[destination.length-1].lat,
              target_lng: destination[destination.length-1].lng
            });
            Queue.publisher('', 'simulator_order', simulation);
            i++;
            if( destination[i] === undefined) {
              Queue.publisher('', 'simulation_finished', JSON.stringify(order));
              clearInterval(interval);
            }
          }, 1000);
        });
    }

    readFile(destination){
      const contents = fs.readFileSync(path.resolve(__dirname, '..', 'destinations', destination+'.txt'), 'utf8');
      const lines = contents.split('\n');
      let dest = [];
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].split(',');
        dest.push({
          lat: line[1],
          lng: line[0]
        });
      }
      return dest;
    }
}

module.exports = new App();
