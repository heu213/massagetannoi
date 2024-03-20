import billItemService from "./billItem.service";
import { get, pick } from 'lodash';
import loggerHelper from '@utils/logger.util';
import { NextFunction, Request, Response } from 'express';
import { setResponse } from "@app/utils/response.util";
import appUtil from "@app/utils/app.util";
import billItemCollection from "./billItem.collection";
const logger = loggerHelper.getLogger('billItem.controller');
const creatBillItemAction = async  (req: Request, res: Response, next: NextFunction  ) => {
    try{
      const dataRequest = {
        ...pick(req.body,['billItemCode','serviceId','quality','employeeId']),
      };
     // const billItemCode = await billItemService.autoCodeIncrementBillItem();
      const createBillItem = await billItemService.createBillItem({...dataRequest});
       res.send(createBillItem);
    }catch (e) {
      logger.error('creatBillItemAction', e);
      next(e);
    }
  }
  const fetchAllBillItemAction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const options:any = appUtil.getPaging(req);
      const query: any = pick(req.query, [
        'keyword',
      ]);
      const billItem = await billItemService.fetchAllBillItem(query,options);
      res.send(billItem);
    } catch (e) {
      logger.error("fetchAllBillItemAction", e);
      next(e);
    }
  };
  const getBillItemByIdAction = async (req: Request, res: Response, next: NextFunction  ) => {
    try {
      const id: string = req.params.id;
      const getBillItemById = await billItemService.getBillItemById(id);
      res.send(getBillItemById)}
    catch (e) {
      logger.error('getBillItemByIdAction', e);
      next(e);
    }
  }
const findByIdAndUpdatBillItemAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const billItem = await billItemService.findByIdAndUpdateBillItem(id, {...req.body});
    res.send(billItem);
  } catch (e) {
    logger.error('findByIdAndUpdatBillItemAction', e);
    next(e);
  }
}

  const findByIdDeletBillItemAction = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
      const { id } = req.params;
      const billItem = await billItemService.findByIdAndDeleteBillItem(id);
      res.send(setResponse(billItem, true,'successfully_deleted'));
    }
    catch (e) {
      logger.error('getOneAndDeletBillItemAction', e);
      next(e);
    }
  }
  export default {
    creatBillItemAction,
    getBillItemByIdAction,
    findByIdAndUpdatBillItemAction,
    findByIdDeletBillItemAction,
    fetchAllBillItemAction
  }