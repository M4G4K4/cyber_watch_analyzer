require('dotenv').config();
var amqp = require('amqplib/callback_api');
const score = require('./src/score');

const queue = (process.env.RABBITMQ_CHANNEL === undefined) ? 'analyze_website' : process.env.RABBITMQ_CHANNEL;


async function analyzer(){
    await amqp.connect('amqp://localhost', async function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(async function(error1, channel) {
            if (error1) {
                throw error1;
            }


            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, async function(msg) {
                console.log(" [x] Received %s in queue %s", msg.content.toString(), queue);
                
                var data = JSON.parse(msg.content.toString());
                console.log(data);
                
                score.perfomAnalysis(data.url)

            }, {
                noAck: true
            });
        });
    });

}

analyzer();