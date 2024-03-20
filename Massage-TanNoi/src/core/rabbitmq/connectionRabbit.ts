import amqb from 'amqplib'
import { RABBITMQ_URL } from '../config'
import loggerHelper from '@utils/logger.util';
const logger = loggerHelper.getLogger('rabbit-connection');

class RabbitMQConnection {
  #connection: amqb.Connection;
  #channel: {[k:string]:amqb.Channel}={};
  constructor (){
    this.#connection = null;
    this.#channel={};
  }
  async connect() {
    try {
      if (!this.#connection) {
      this.#connection = await amqb.connect(RABBITMQ_URL)
        .then((res)=>{
          logger.info('--Connected to Rabbit--')
          return res
        })
        }
    } catch (error) {
      logger.error('Error connecting to Rabbit: ',error)
      throw new Error(error)
    }
  }
  async createChannel (queue:string,config?:amqb.Options.AssertQueue){
    if(!this.#channel?.[JSON.stringify(queue)]){
      this.#channel[JSON.stringify(queue)] = await this.#connection.createChannel()
    }
    this.#channel[JSON.stringify(queue)].assertQueue(queue,{durable:true,...config})
    return this.#channel[JSON.stringify(queue)]
  }

  getConnection() {
    if (!this.#connection) {
      throw new Error('No connection established.');
    }
    return this.#connection;
  }
}
 
export default new RabbitMQConnection();
