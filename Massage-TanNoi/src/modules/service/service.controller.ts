import serviceService from "./service.service";
import { pick } from 'lodash';
import loggerHelper from '@utils/logger.util';
import { NextFunction, Request, Response } from 'express';
import { setResponse } from "@app/utils/response.util";
import appUtil from "@app/utils/app.util";
const logger = loggerHelper.getLogger('service.controller');
const creatServiceAction = async  (req: Request, res: Response, next: NextFunction  ) => {
    try{
      console.log('req.body',req.body);
      const dataRequest = {
        ...pick(req.body,['serviceName','description']),
      }
      const createService = await serviceService.createService(dataRequest);
       res.send(createService);
    }catch (e) {
      logger.error('creatServiceAction', e);
      next(e);
    }
  }
  
  const fetchAllServiceAction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const options:any = appUtil.getPaging(req);
      const query: any = pick(req.query, [
        'keyword',
      ]);
      const service = await serviceService.fetchAllService(query,options);
      res.send(service);
    } catch (e) {
      logger.error("fetchAllServiceAction", e);
      next(e);
    }
  };
  const getServiceByIdAction = async (req: Request, res: Response, next: NextFunction  ) => {
    try {
      const id: string = req.params.id;
      const getServiceById = await serviceService.getServiceById(id);
      res.send(getServiceById)}
    catch (e) {
      logger.error('getServiceByIdAction', e);
      next(e);
    }
  }
  const findByIdAndUpdatServiceAction = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
      const id:string = req.params.id;
      const service = await serviceService.findByIdAndUpdateService(id,{...req.body});
      res.send(service) 
    }catch (e){
      logger.error('findByIdAndUpdatServiceAction', e);
      next(e);
    }
  }

  const findByIdDeletServiceAction = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
      const { id } = req.params;
      const service = await serviceService.findByIdAndDeleteService(id);
      res.send(setResponse(service, true,'successfully_deleted'));
    }
    catch (e) {
      logger.error('getOneAndDeletServiceAction', e);
      next(e);
    }
  }
  export default {
    creatServiceAction,
    getServiceByIdAction,
    findByIdAndUpdatServiceAction,
    findByIdDeletServiceAction,
    fetchAllServiceAction
  }