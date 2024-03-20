import Axios from 'axios';
import fetch from 'node-fetch';
import loggerHelper from '@utils/logger.util';
import { TELEGRAM_API_BASE_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_GROUP_CHAT_ID } from '../config';

const logger = loggerHelper.getLogger('core.telegram');

  const sendNotificationsGroup = async (text: string) : Promise<any>  => {
    const encodedText = encodeURIComponent(text);
    const enpoint = `${TELEGRAM_API_BASE_URL}/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_GROUP_CHAT_ID}&text=${encodedText}`;
    
    try{
     
      const response = await Axios.get(enpoint);
      
      return Promise.resolve(response.data);
      
    }
    catch(err){
      logger.error("sendNotificationsGroup", err.message);
      

      
      
    }
  }

export default {
  sendNotificationsGroup

}
