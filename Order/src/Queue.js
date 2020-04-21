const amqp = require('amqplib/callback_api');

class Queue {
    constructor() {
        let {RABBITMQ_USER, RABBITMQ_PASS, RABBITMQ_HOST, RABBITMQ_PORT, RABBITMQ_VHOST} = process.env;
        this.url = 'amqp://'+RABBITMQ_USER+':'+RABBITMQ_PASS+'@'+RABBITMQ_HOST+':'+RABBITMQ_PORT+RABBITMQ_VHOST;
        this.amqp = amqp;
        this.channel = null;
    }

    async connection() {
        return new Promise((resolve, reject) => {
            this.amqp.connect(this.url, function(error, connection) {
                if (error) {
                    reject(error);
                }
                resolve(connection)
            });
        });
    }

    async createChannel() {
        let connection = await this.connection();
        return new Promise((resolve, reject) => {
            connection.createChannel(function(error, channel) {
                if (error) {
                    reject(error);
                }
                resolve(channel)
            });
        })
    }

    async publisher(exchange, routingKey, message) {
        if (this.channel === null) {
            this.channel = await this.createChannel();
        }
        this.channel.assertQueue(routingKey, {
          durable: true
        });
        this.channel.publish(exchange, routingKey, Buffer.from(message));
    }

    async consume(queue, callback) {
        if (this.channel === null) {
            this.channel = await this.createChannel();
        }
        this.channel.assertQueue(queue, {
          durable: true
        });
        this.channel.prefetch(1);
        this.channel.consume(queue, async (msg) => {
            callback(msg.content.toString());
            this.channel.ack(msg);
        });
    }
}

module.exports = new Queue();
