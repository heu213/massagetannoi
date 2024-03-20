import cityService from "./city.service";
import { pick } from 'lodash';
import loggerHelper from '@utils/logger.util';
import { NextFunction, Request, Response } from 'express';
import { setResponse } from "@app/utils/response.util";
import appUtil from "@app/utils/app.util";
const logger = loggerHelper.getLogger('city.controller');
const creatCityAction = async  (req: Request, res: Response, next: NextFunction  ) => {
    try{
      console.log('req.body',req.body);
      const dataRequest = {
        ...pick(req.body,['cityName','employeeId']),
      }
      const createCity = await cityService.createCity(dataRequest);
       res.send(createCity);
    }catch (e) {
      logger.error('creatCityAction', e);
      next(e);
    }
  }
  const fetchAllCityAction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const options:any = appUtil.getPaging(req);
      const query: any = pick(req.query, [
        'keyword',
      ]);
      const city = await cityService.fetchAllCity(query,options);
      res.send(city);
    } catch (e) {
      logger.error("fetchAllCityAction", e);
      next(e);
    }
  };
  const getCityByIdAction = async (req: Request, res: Response, next: NextFunction  ) => {
    try {
      const id: string = req.params.id;
      const getCityById = await cityService.getCityById(id);
      res.send(getCityById)}
    catch (e) {
      logger.error('getCityByIdAction', e);
      next(e);
    }
  }
  const findByIdAndUpdatCityAction = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
      const id:string = req.params.id;
      const city = await cityService.findByIdAndUpdateCity(id,{...req.body});
      res.send(city) 
    }catch (e){
      logger.error('findByIdAndUpdatCityAction', e);
      next(e);
    }
  }

  const findByIdDeletCityAction = async (req: Request, res: Response, next: NextFunction ) =>{
    try {
      const { id } = req.params;
      const city = await cityService.findByIdAndDeleteCity(id);
      res.send(setResponse(city, true,'successfully_deleted'));
    }
    catch (e) {
      logger.error('getOneAndDeletCityAction', e);
      next(e);
    }
  }
  export default {
    creatCityAction,
    getCityByIdAction,
    findByIdAndUpdatCityAction,
    findByIdDeletCityAction,
    fetchAllCityAction
  }