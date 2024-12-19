import { Injectable } from '@nestjs/common';
import { connect } from 'amqplib';
import config from 'src/config';

@Injectable()
export class SenderService {
  public async sender() {
    const connection = await connect(config.RABBITMQ_URL);
    const channel = await connection.createChannel();

    const queue = 'hello';
    const msg = 'Hello world';
    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
    console.log(' [x] Sent %s', msg);

    setTimeout(() => {
      connection.close();
      console.log('Connection closed');
    }, 500);
  }

  public async senderExchange() {
    const connection = await connect(config.RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Declare an exchange (Direct Exchange)
    const exchange = 'T1';
    await channel.assertExchange(exchange, 'direct', { durable: true });

    const queue = 'qT1';
    await channel.assertQueue(queue, { durable: true });

    // Define routing key and message
    const routingKey = 'infot1'; // Change to 'error' or another key to test
    const message = 'Hello RabbitMQ with Exchange!';

    await channel.bindQueue(queue, exchange, routingKey);

    // Send a message to the exchange with a routing key
    channel.publish(exchange, routingKey, Buffer.from(message), {
      persistent: true,
    });

    console.log(`[x] Sent: ${message}`);

    // Close connection after message is sent
    setTimeout(() => {
      connection.close();
    }, 500);
  }

  public async senderBroadcast() {
    const connection = await connect(config.RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Declare an exchange (Direct Exchange)
    const exchange = 'broadcast';
    await channel.assertExchange(exchange, 'fanout', { durable: true });

    // Define routing key and message
    const message = 'Hello all consumers!, I am sender';

    // Send a message to the exchange with a routing key
    channel.publish(exchange, '', Buffer.from(message));

    console.log(`[x] Broadcast Sent: ${message}`);

    // Close connection after message is sent
    setTimeout(() => {
      connection.close();
    }, 500);
  }
}
