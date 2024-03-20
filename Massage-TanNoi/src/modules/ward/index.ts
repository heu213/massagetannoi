import middleware from '@app/core/middleware';
import express from 'express';
import wardController from './ward.controller';
import { CORE_ACTIONS, CORE_RESOURCES } from '@app/core/permissions';

const wardRoutes = (app: express.Application): void => {
    app.post('/api/v1/ward', 
    wardController.creatWardAction);
    app.get('/api/v1/ward', 
    wardController.fetchAllWardAction);
    app.get('/api/v1/ward/:id', 
      wardController.getWardByIdAction);
    app.put('/api/v1/ward/:id', 
      wardController.findByIdAndUpdatWardAction);            
    app.delete('/api/v1/ward/:id', 
      wardController.findByIdDeleteWardAction);
}
 export default wardRoutes