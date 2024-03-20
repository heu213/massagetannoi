import wardService from "./ward.service";
import { pick } from 'lodash';
import loggerHelper from '@utils/logger.util';
import { NextFunction, Request, Response } from 'express';
import { setResponse } from "@app/utils/response.util";
import appUtil from "@app/utils/app.util";
const logger = loggerHelper.getLogger('ward.controller');
const creatWardAction = async  (req: Request, res: Response, next: NextFunction  ) => {
    try{
      const dataRequest = {
        ...pick(req.body,['wardName','employeeId']),
      }
      const createWard = await wardService.createWard(dataRequest);
       res.send(createWard);
    }catch (e) {
      logger.error('creatWardAction', e);
      next(e);
    }
  }
  const fetchAllWardAction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const options:any = appUtil.getPaging(req);
      const query: any = pick(req.query, [
        'keyword',
      ]);
      const ward = await wardService.fetchAllWard(query,options);
      res.send(ward);
    } catch (e) {
      logger.error("fetchAllWardAction", e);
      next(e);
    }
  };
  const getWardByIdAction = async (req: Request, res: Response, next: NextFunction  ) => {
    try {
      const id: string = req.params.id;
      const getWardById = await wardService.getWardById(id);
      res.send(getWardById)}
    catch (e) {
      logger.error('getWardByIdAction', e);
      next(e);
    }
  }
  const findByIdAndUpdatWardAction = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
      const id:string = req.params.id;
      const ward = await wardService.findByIdAndUpdateWard(id,{...req.body});
      res.send(ward) 
    }catch (e){
      logger.error('findByIdAndUpdatWardAction', e);
      next(e);
    }
  }

  const findByIdDeleteWardAction = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
      const { id } = req.params;
      const ward = await wardService.findByIdAndDeleteWard(id);
      res.send(setResponse(ward, true,'successfully_deleted'));
    }
    catch (e) {
      logger.error('getOneAndDeletWardAction', e);
      next(e);
    }
  }
  export default {
    creatWardAction,
    getWardByIdAction,
    findByIdAndUpdatWardAction,
    findByIdDeleteWardAction,
    fetchAllWardAction
  }