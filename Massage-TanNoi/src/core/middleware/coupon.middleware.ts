import loggerHelper from '@utils/logger.util';
import jwtUtil from '@app/utils/jwt.util';
import express from 'express';
import { get } from 'lodash';
import { NotFoundError } from '../types/ErrorTypes';
import couponService from '@app/modules/coupon/coupon.service';
import { COUPON_DISTRIBUTION_TYPE, NAME_COUPON } from '@app/modules/coupon/constant';
import CustomerAddressCollection from '@app/modules/customer-account/customer-address.collection';
import usageCouponService from '@app/modules/usage-coupon/usage-coupon.service';
import { NAME_ERROR } from '../types/constants';
import CouponCollection from '@app/modules/coupon/coupon.collection';
import { Types } from 'mongoose';
import ServiceCollection from '@app/modules/wh-service/wh-service.collection';
const logger = loggerHelper.getLogger('middleware.coupon');

const checkCouponMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {


  try {

    let discountCode = get(req.body, 'discountCode') || get(req.body, 'couponCode');
    if (!discountCode) {
      next();
    }
    else {
      let token: string = get(req, 'headers.authorization') || '';
      token = token ? token.split(' ')[1] : '';
      let data = req.body;
      const user = jwtUtil.verifyToken(token);

      let validCoupon = await usageCouponService.getValidCoupon(discountCode, {
        customerAccountId: get(user, 'id'),
        // whServiceIds: get(data, 'whServiceIds') || [],
        // addressBy: get(data, 'customerAddress'),
        // serviceGroupType: get(data, 'serviceGroupType')
      });

      // if (!validCoupon) {
      //   throw new NotFoundError(NAME_ERROR.coupon_code_does_not_exist_or_has_expired);
      // }
      if(get(data,'discountCode')){
        const billItems = get(data,'billItems');
        const listServiceOfBillItem = billItems?.map((item:any) => get(item,'whServiceId'));
        const coupon = await CouponCollection.findOne({code: get(data,'discountCode')});
        if(get(coupon,'whServiceId',[])?.length >0){
          const whServices = get(coupon,'whServiceId',[]);
          const checkServiceNotUseCoupon = listServiceOfBillItem.filter((item:any) => !whServices.includes(item));
          if(checkServiceNotUseCoupon?.length >0){
            const resultListService = checkServiceNotUseCoupon?.map((item:any) => Types.ObjectId(item));
            const listWhService = await ServiceCollection.find({_id: {$in: resultListService}}).lean().exec();
            const result = listWhService?.map(item => `${item?.code}-${item?.name?.vi}`).join('\n');
            throw new NotFoundError(`${NAME_COUPON.this_discount_code_is_not_applicable_to_the_following_services} \n ${result}`);
          }
        }
      }
      next();
    }
  } catch (error) {
    logger.error('checkCouponMiddleware ERROR', error);
    next(error);
  }
};

const useCouponMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    let billData = req.body;
    let customerAddressId = get(billData, 'customerAddressId');
    let couponCode = get(billData, 'discountCode') || get(billData, 'couponCode');
    if (!couponCode) {
      next();

    }
    else {
      const customerAddress = await CustomerAddressCollection.findOne({
        _id: customerAddressId
      })

      let coupon = await couponService.findOneCoupon({
        code: couponCode
      })
      if (coupon) {
        let distributionType = get(coupon, 'distributionType');
        switch (distributionType) {
          case COUPON_DISTRIBUTION_TYPE.PUBLIC: {
            await usageCouponService.increaseUsageCountCoupon({
              couponId: get(coupon, '_id'),
              customerAddressId: null
            });
          }; break;
          case COUPON_DISTRIBUTION_TYPE.PRIVATE: {
            let customerAccountId = customerAddress.customerAccountId;
            await usageCouponService.increaseUsageCountCoupon({
              customerAccountId: customerAccountId,
              couponId: get(coupon, '_id')
            })
          }; break;
          default: {
          }
        }


      }
      else {
        throw new NotFoundError(NAME_ERROR.coupon_code_does_not_exist_or_has_expired);
      }
      next();
    }
  } catch (error) {
    logger.error('useCouponMiddleware ERROR', error);
    next(error);
  }

}

const assignCouponMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    let customerAccountId = req.body.customerAccountId;
    await usageCouponService.addFreeCouponsToUsageCoupon({
      customerAccountId
    })
    next();
  } catch (err) {
    logger.error('assignCouponMiddleware',err);
    next(err);
  }

}

const preHookGetFreeCouponMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    let token: string = get(req, 'headers.authorization') || '';
    token = token ? token.split(' ')[1] : '';
    let data = req.body;
    const user = jwtUtil.verifyToken(token);
    const {addressPath} : any = get(data, 'address',{});
    const couponData: any = {
      customerAccountId: get(user, 'id'),
      whServiceIds: get(data, 'whServiceIds') || [],
      addressBy: get(data, 'customerAddress') || get(data, 'address'),
      serviceGroupType: get(data, 'serviceGroupType')
    }
    req.body.couponData = couponData;
    const { customerAccountId, whServiceIds, addressBy, serviceGroupType } = couponData || {};
    const freshifyUsageCoupon = await usageCouponService.freshifyUsageCoupon({
      customerAccountId
    })

    const addFreeCouponsToUsageCoupon = await usageCouponService.addFreeCouponsToUsageCoupon({
      customerAccountId,addressPath
    })
    next();
  } catch (err) {
    logger.error('preHookGetFreeCouponMiddleware',err);
    next(err);
  }
}

const preHookGetFreeCouponMiddlewareAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    let data = req.body;
    const couponData: any = {
      customerAccountId: get(data, 'userId'),
      whServiceIds: get(data, 'whServiceIds') || [],
      addressBy: get(data, 'customerAddress') || get(data, 'address'),
      serviceGroupType: get(data, 'serviceGroupType')
    }
    req.body.couponData = couponData;
    const { customerAccountId, whServiceIds, addressBy, serviceGroupType } = couponData || {};
    const freshifyUsageCoupon = await usageCouponService.freshifyUsageCoupon({
      customerAccountId
    })

    const addFreeCouponsToUsageCoupon = await usageCouponService.addFreeCouponsToUsageCoupon({
      customerAccountId
    })
    next();
  } catch (err) {
    logger.error('preHookGetFreeCouponMiddlewareAdmin',err);
    next(err);
  }
}

export {
  checkCouponMiddleware,
  useCouponMiddleware,
  assignCouponMiddleware,
  preHookGetFreeCouponMiddleware,
  preHookGetFreeCouponMiddlewareAdmin
};
