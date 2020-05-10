# Delivery Simulator
This project is a delivery simulator that shows the driver's position on the map in real time. The test project was inspired by the Codelivery project created by the School of Net during the FullCycle Marathon.

## Technologies
* NodeJs
* PostgreSql
* RabbitMQ
* Google Maps
* WebSocket(Socket.IO)
* Docker

## Architecture
There are 3 services developed in NodeJs communicating through the queues using RabbitMQ

* **Orders**: It is the service where orders and drivers are stored in PostgreSql. When registering an order an event is sent to start the simulator service
IMAGEM
![Service Order](https://github.com/dbemfica/DeliverySimulator/blob/master/Map/public/img/order.png?raw=true)

* **Simulator**: Cycles through the latitude and longitude coordinates to simulate the delivery by sending the data to the map service. When delivery is finalized it sends an event to change the status of the Order

* **Map**: It is the service that is receiving the driver's position sent by the simulator using google maps displays a map showing the driver's real-time position
![Service Map](https://github.com/dbemfica/DeliverySimulator/blob/master/Map/public/img/map.gif?raw=true)

## Google Maps API
You will need a Google Maps key. To get your key from this link.

https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en

Then add your key to the file **.env.production**
```bash
APP_PORT=8081

GOOGLE_MAPS_KEY=<YOUR KEY>
GOOGLE_MAPS_START_LAT=
GOOGLE_MAPS_START_LNG=

RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASS=guest
RABBITMQ_VHOST=/
```

## How add destination
To add new destinations you need to use the Google Maps feature of Create a map.
You can access this feature at this link

https://www.google.com/intl/pt-BR/maps/about/mymaps/

Within your map, assemble a route and then export it in KML format. Then just remove all content from the KML file and keep only the latitude and longitude coordinates

## Start
Run this command
```bash
docker-compose up -d
```
Then just go to this URL http://localhost:8080
