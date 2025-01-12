import loggerHelper from '@utils/logger.util';
import jwtUtil from '@app/utils/jwt.util';
import express from 'express';
import { get } from 'lodash';
import { UnauthorizedError,UnAuthenticated } from '../types/ErrorTypes';
import CustomerAccountCollection from './../../modules/customer-account/customer-account.collection';
import {Types} from 'mongoose'
const logger = loggerHelper.getLogger('middleware.authenticate');

const authenticateMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token: string = get(req, 'headers.authorization') || '';
  const companyId: string = get(req, 'headers.companyid') || '';
  const client: string = get(req, 'headers.client', '') || '';
  try {
    const jwtToken = token ? token.split(' ')[1] : '';
    const user: any = jwtUtil.verifyToken(jwtToken);
    const customer = await CustomerAccountCollection.findOne({_id:Types.ObjectId(user.id)});

    if (!user) {
      throw new UnauthorizedError();
    }
    if (get(customer,'state')==='INACTIVE') {
      throw new UnAuthenticated();
    }
   
    const sessionKey = `userId:${user.id}:session:${user.sessionId}`;
  
    req.user = user;
    req.companyId = companyId;

  
    
    next();
  } catch (error) {
    logger.error('authenticateMiddleware ERROR', error);
    next(error);
  }
};

export default authenticateMiddleware;
