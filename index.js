require('dotenv').config();
var amqp = require('amqplib/callback_api');

const queue = (process.env.RABBITMQ_CHANNEL === undefined) ? 'analyze_website' : process.env.RABBITMQ_CHANNEL;


amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }


        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s in queue %s", msg.content.toString(), queue);
            
            var data = JSON.parse(msg.content.toString());
            console.log(data);
        }, {
            noAck: true
        });
    });
});