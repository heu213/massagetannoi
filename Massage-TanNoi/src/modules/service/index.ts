import middleware from '@app/core/middleware';
import express from 'express';
import serviceController from './service.controller';
import { CORE_ACTIONS, CORE_RESOURCES } from '@app/core/permissions';

const serviceRoutes = (app: express.Application): void => {
    app.post('/api/v1/service', 
    serviceController.creatServiceAction);
    app.get('/api/v1/service', 
    serviceController.fetchAllServiceAction);
    app.get('/api/v1/service/:id', 
      serviceController.getServiceByIdAction);
    app.put('/api/v1/service/:id', 
      serviceController.findByIdAndUpdatServiceAction);            
    app.delete('/api/v1/service/:id', 
      serviceController.findByIdDeletServiceAction);
}
 export default serviceRoutes