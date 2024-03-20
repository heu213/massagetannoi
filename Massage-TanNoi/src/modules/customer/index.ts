import middleware from '@app/core/middleware';
import express from 'express';
import customerController from './customer.controller';
import { CORE_ACTIONS, CORE_RESOURCES } from '@app/core/permissions';

const customerRoutes = (app: express.Application): void => {
    app.post('/api/v1/customer', 
    customerController.creatCustomerAction);
    app.get('/api/v1/customer', 
    customerController.fetchAllCustomerAction);
    app.get('/api/v1/customer/:id', 
      customerController.getCustomerByIdAction);
    app.put('/api/v1/customer/:id', 
      customerController.findByIdAndUpdatCustomerAction);            
    app.delete('/api/v1/customer/:id', 
      customerController.findByIdDeletCustomerAction);
}
 export default customerRoutes