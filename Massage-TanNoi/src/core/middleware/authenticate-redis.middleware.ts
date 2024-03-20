import loggerHelper from '@utils/logger.util';
import jwtUtil from '@app/utils/jwt.util';
import express from 'express';
import { get } from 'lodash';
import { UnauthorizedError } from '../types/ErrorTypes';
import { any } from 'bluebird';
const jwt = require('jsonwebtoken');




const logger = loggerHelper.getLogger('middleware.authenticate');


const authenticateRedisMiddleware = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    const token: string = get(req, 'headers.authorization') || '';
    try {
        const jwtToken = token ? token.split(' ')[1] : '';
        const user: any = jwtUtil.verifyToken(jwtToken);
        if (!user) {
            throw new UnauthorizedError();
        }

        // verify JWT token
        const decoded = jwtUtil.verifyToken(jwtToken);

        const sessionId = user.sessionId
        // look up session data in Redis
        next();
       
    } catch (error) {
        logger.error('authenticateRedisMiddleware ERROR', error);
        next(error);
    }

}

export default authenticateRedisMiddleware;
