import request from '../axios'; // Import the request object you defined
import loggerHelper from '@utils/logger.util';
import { HERE_MAP_API_KEY, HERE_MAP_GEOCODE_API_URL } from '@app/core/config';
import { ValidationFailedError } from '@app/core/types/ErrorTypes';

const logger = loggerHelper.getLogger('service.ts');

/**
 * call Api get position from here map.
 * @param {string} addressPath - Name of the location of the road
 * @returns {Promise<any>} - return value items is Array . 
 */

const callApiHereMap = async (addressPath:string) => {
  try {    
    const response = await request.get(
      `${HERE_MAP_GEOCODE_API_URL}/v1/geocode?q=${encodeURIComponent(addressPath)}&apiKey=${HERE_MAP_API_KEY}`
    );

    return response;
  } catch (error) {
    console.error('Error:', error.message);
    return {};
  }
};

export default {
  callApiHereMap
};