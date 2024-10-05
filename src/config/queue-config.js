


const amqplib = require('amqplib');
const { EmailService } = require('../services');

let channel, connection;


async function connectQueue(){
    try {
        connection = await amqplib.connect("amqp://localhost");
        channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");

        channel.consume("noti-queue", (data)=>{
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            EmailService.sendEmail("hossainasif46@gmail.com", object.recepientEmail, object.subject, object.text);


            channel.ack(data);
        })

    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = {
    connectQueue
}