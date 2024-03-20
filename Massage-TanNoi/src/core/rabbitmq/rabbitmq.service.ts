import amqp from 'amqplib';
import { RABBITMQ_URL } from '../config';
import loggerHelper from '@utils/logger.util';
const logger = loggerHelper.getLogger('rabbitmq.service');


class RabbitMQChannelFactory {
  private static instance: RabbitMQChannelFactory;
  private connection: amqp.Connection | null;

  private constructor() {
    this.connection = null;
  }
  
  public static getInstance(): RabbitMQChannelFactory {
    if (!this.instance) {
      this.instance = new RabbitMQChannelFactory();
    }
    return this.instance;
  }

  public async createChannel(): Promise<amqp.Channel> {
    try {
      if (!this.connection) {
        this.connection = await amqp.connect(RABBITMQ_URL);
        logger.info('Rabbitmq Connection successful!');
      }
      return this.connection.createChannel();
    } catch (e) {
      logger.error('RabbitMQChannelFactory', e)
    }
    
  }
}

export default RabbitMQChannelFactory;