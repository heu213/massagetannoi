import employeeService from "./employee.service";
import { get, pick } from 'lodash';
import loggerHelper from '@utils/logger.util';
import { NextFunction, Request, Response } from 'express';
import { setResponse } from "@app/utils/response.util";
import appUtil from "@app/utils/app.util";
import employeeCollection from "./employee.collection";
const logger = loggerHelper.getLogger('employee.controller');
const creatEmployeeAction = async  (req: Request, res: Response, next: NextFunction  ) => {
    try{
      const dataRequest = {
        ...pick(req.body,['seviceName','employeeCode','managementArea','ticketType','service','rating','priceTicket','timeService','count']),
      };
      const employeeCode = await employeeService.autoCodeIncrementEmployee();
      const createEmployee = await employeeService.createEmployee({...dataRequest,employeeCode});
       res.send(createEmployee);
    }catch (e) {
      logger.error('creatEmployeeAction', e);
      next(e);
    }
  }
  const fetchAllEmployeeAction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const options:any = appUtil.getPaging(req);
      const query: any = pick(req.query, [
        'keyword',
      ]);
      const employee = await employeeService.fetchAllEmployee(query,options);
      res.send(employee);
    } catch (e) {
      logger.error("fetchAllEmployeeAction", e);
      next(e);
    }
  };
  const getEmployeeByIdAction = async (req: Request, res: Response, next: NextFunction  ) => {
    try {
      const id: string = req.params.id;
      const getEmployeeById = await employeeService.getEmployeeById(id);
      res.send(getEmployeeById)}
    catch (e) {
      logger.error('getEmployeeByIdAction', e);
      next(e);
    }
  }
const findByIdAndUpdatEmployeeAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const { timeService } = req.body;
    let { priceTicket } = req.body;
    if (timeService === "45 phút") {
      priceTicket = 350000;
    } else if (timeService === "60 phút") {
      priceTicket = 400000;
    } else if (timeService === "90 phút") {
      priceTicket = 500000;
    }
    const updatedData = { ...req.body, priceTicket };
    const employee = await employeeService.findByIdAndUpdateEmployee(id, updatedData);
    res.send(employee);
  } catch (e) {
    logger.error('findByIdAndUpdatEmployeeAction', e);
    next(e);
  }
}

  const findByIdDeletEmployeeAction = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
      const { id } = req.params;
      const employee = await employeeService.findByIdAndDeleteEmployee(id);
      res.send(setResponse(employee, true,'successfully_deleted'));
    }
    catch (e) {
      logger.error('getOneAndDeletEmployeeAction', e);
      next(e);
    }
  }
  export default {
    creatEmployeeAction,
    getEmployeeByIdAction,
    findByIdAndUpdatEmployeeAction,
    findByIdDeletEmployeeAction,
    fetchAllEmployeeAction
  }