import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { connect } from 'amqplib';
import config from 'src/config';

@Injectable()
export class ConsumerService {
  @Timeout(2000)
  public async consumerQueue() {
    console.log('start consumer queue');
    const connection = await connect(config.RABBITMQ_URL);
    const channel = await connection.createChannel();

    const queue = 'hello';
    await channel.assertQueue(queue, { durable: true });

    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          console.log(`[q] Received: ${msg.content.toString()}`);
          console.log(4444, msg);
          // confirm rabbitmq receive successa
          // channel.ack(msg);
        }
      },
      { noAck: true },
    );
  }

  @Timeout(3000)
  public async consumerExchange() {
    console.log('start consumer Exchange');
    const connection = await connect(config.RABBITMQ_URL);
    const channel = await connection.createChannel();

    const exchange = 'direct_logs';
    await channel.assertExchange(exchange, 'direct', { durable: true });

    // // Declare a queue
    const queue = 'qT1';
    await channel.assertQueue(queue, { durable: true });

    // // Bind the queue to the exchange with the routing key 'info'
    const routingKey = 'info';
    channel.bindQueue(queue, exchange, routingKey);

    console.log(`[ed] Waiting for messages in ${queue}. To exit press CTRL+C`);

    // Consume messages from the queue
    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          console.log(
            `[ed] Received exchange from queue ${queue}: ${msg.content.toString()}`,
          );
          console.log(4444, msg);
          // channel.ack(msg);
        }
      },
      { noAck: true },
    );
  }

  @Timeout(3100)
  public async consumerExchange2() {
    console.log('start consumer Exchange 2');
    const connection = await connect(config.RABBITMQ_URL);
    const channel = await connection.createChannel();

    const exchange = 'direct_logs';
    await channel.assertExchange(exchange, 'direct', { durable: true });

    // // Declare a queue
    const queue = 'qT1';
    await channel.assertQueue(queue, { durable: true });

    // // Bind the queue to the exchange with the routing key 'info'
    const routingKey = 'info';
    channel.bindQueue(queue, exchange, routingKey);

    console.log(`[ed2] Waiting for messages in ${queue}. To exit press CTRL+C`);

    // Consume messages from the queue
    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          console.log(
            `[ed2] Received exchange from queue ${queue}: ${msg.content.toString()}`,
          );
          console.log(555, msg);
        }
      },
      { noAck: true },
    );
  }

  @Timeout(3100)
  public async consumerBroadcast1() {
    console.log('start consumer Broadcast 1');
    const connection = await connect(config.RABBITMQ_URL);
    const channel = await connection.createChannel();

    const exchange = 'broadcast';
    await channel.assertExchange(exchange, 'fanout', { durable: true });

    // Tạo một queue tạm thời (mỗi consumer có queue riêng)
    const { queue } = await channel.assertQueue('', { exclusive: true });

    // // Bind the queue to the exchange with the routing key 'info'
    channel.bindQueue(queue, exchange, '');

    console.log(`[b1] Broadcast Consumer 1: Waiting for messages in ${queue}`);

    // Consume messages from the queue
    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          console.log(
            `[b1] Broadcast Consumer 1 Received exchange from queue ${queue}: ${msg.content.toString()}`,
          );
          console.log(9999, msg);
        }
      },
      { noAck: true },
    );
  }

  @Timeout(3200)
  public async consumerBroadcast2() {
    console.log('start consumer Broadcast 2');
    const connection = await connect(config.RABBITMQ_URL);
    const channel = await connection.createChannel();

    const exchange = 'broadcast';
    await channel.assertExchange(exchange, 'fanout', { durable: true });

    // Tạo một queue tạm thời (mỗi consumer có queue riêng)
    const { queue } = await channel.assertQueue('', { exclusive: true });

    // // Bind the queue to the exchange with the routing key 'info'
    channel.bindQueue(queue, exchange, '');

    console.log(`[b2] Broadcast Consumer 2: Waiting for messages in ${queue}`);

    // Consume messages from the queue
    channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          console.log(
            `[b2] Broadcast Consumer 2 Received exchange from queue ${queue}: ${msg.content.toString()}`,
          );
          console.log(888, msg);
        }
      },
      { noAck: true },
    );
  }
}
