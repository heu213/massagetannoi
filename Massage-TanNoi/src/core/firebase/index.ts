import axios from '@core/axios';
import { FIREBASE } from '@core/config';
import get from 'lodash/get';
import loggerHelper from '@utils/logger.util';

const logger = loggerHelper.getLogger('firebase');

const verifyPhoneNumber = (sessionInfo: string, code: string) => axios.post(
  `${FIREBASE.VERIFY_ENDPOINT}/verifyPhoneNumber?key=${FIREBASE.API_KEY}`,
  { sessionInfo, code },
);

const getDataFromToken = (idToken: string) => axios.post(`${FIREBASE.VERIFY_ENDPOINT}/getAccountInfo?key=${FIREBASE.API_KEY}`, {
  idToken,
}).then((response: any) => get(response, 'users.0', null))
  .catch((error: any): any => {
    logger.error('getDataFromToken', error);
    return null;
  });

export default {
  verifyPhoneNumber,
  getDataFromToken,
};
