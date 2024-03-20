import customerService from "./customer.service";
import { get, pick } from 'lodash';
import loggerHelper from '@utils/logger.util';
import { NextFunction, Request, Response } from 'express';
import { setResponse } from "@app/utils/response.util";
import appUtil from "@app/utils/app.util";
import employeeCollection from "../employee/employee.collection";
import { NAME_NOTIFICATION } from "@app/core/notifications/constants";
import { BO_CLIENT_URL } from "@app/core/config";
import typeNotification from '@app/core/notifications/index';
const logger = loggerHelper.getLogger('customer.controller');
const creatCustomerAction = async  (req: Request, res: Response, next: NextFunction  ) => {
    try{
      const dataRequest = {
        ...pick(req.body,['customerName','customerCode','address','phoneNumber','employeeId','email']),
      }
      const dataEmployee = await employeeCollection.findById(dataRequest.employeeId);
      
      const createCustomer = await customerService.createCustomer(dataRequest);
      const notificationTelegram = {
        providerType: NAME_NOTIFICATION.TELEGRAM,
        templateData: () => {
          const messageContent = `Nhân viên có mã số ${get(dataEmployee.toObject(), 'employeeCode')} vừa được đặt thành công\nThông tin khách hàng:\n- Họ và tên: ${dataRequest.customerName}\n- Số điện thoại: ${dataRequest.phoneNumber}\n- Địa chỉ: ${dataRequest.address}`;
          return {
            messageContent
          };
        }        
      }
      const messageTelegram = new typeNotification.sendNotifications(notificationTelegram);
      messageTelegram.send();
       res.send(createCustomer);
    }catch (e) {
      logger.error('creatCustomerAction', e);
      next(e);
    }
  }
  const fetchAllCustomerAction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const options:any = appUtil.getPaging(req);
      const query: any = pick(req.query, [
        'keyword',
      ]);
      const customer = await customerService.fetchAllCustomer(query,options);
      res.send(customer);
    } catch (e) {
      logger.error("fetchAllCustomerAction", e);
      next(e);
    }
  };
  const getCustomerByIdAction = async (req: Request, res: Response, next: NextFunction  ) => {
    try {
      const id: string = req.params.id;
      const getCustomerById = await customerService.getCustomerById(id);
      res.send(getCustomerById)}
    catch (e) {
      logger.error('getCustomerByIdAction', e);
      next(e);
    }
  }
  const findByIdAndUpdatCustomerAction = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
      const id:string = req.params.id;
      const customer = await customerService.findByIdAndUpdateCustomer(id,{...req.body});
      res.send(customer) 
    }catch (e){
      logger.error('findByIdAndUpdatCustomerAction', e);
      next(e);
    }
  }

  const findByIdDeletCustomerAction = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
      const { id } = req.params;
      const customer = await customerService.findByIdAndDeleteCustomer(id);
      res.send(setResponse(customer, true,'successfully_deleted'));
    }
    catch (e) {
      logger.error('getOneAndDeletCustomerAction', e);
      next(e);
    }
  }
  export default {
    creatCustomerAction,
    getCustomerByIdAction,
    findByIdAndUpdatCustomerAction,
    findByIdDeletCustomerAction,
    fetchAllCustomerAction
  }