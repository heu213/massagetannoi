import authenticateRedisMiddleware from './authenticate-redis.middleware';
import authenticateMiddleware from './authenticate.middleware';
import authorizationMiddleware from './authorization.middleware';
import {assignCouponMiddleware, checkCouponMiddleware, preHookGetFreeCouponMiddleware, useCouponMiddleware , preHookGetFreeCouponMiddlewareAdmin} from './coupon.middleware';
import jwtMiddleware from './jwt.middleware';

export default {
  authenticate: authenticateMiddleware,
  jwt: jwtMiddleware,
  authorization: authorizationMiddleware,
  checkCoupon: checkCouponMiddleware,
  useCoupon: useCouponMiddleware,
  assignCoupon: assignCouponMiddleware,
  preHookGetFreeCoupon: preHookGetFreeCouponMiddleware,
  preHookGetFreeCouponAdmin: preHookGetFreeCouponMiddlewareAdmin,
  authenticateRedis: authenticateRedisMiddleware
};
