import express from 'express';
import billItemController from './billItem.controller';

const billItemRoutes = (app: express.Application): void => {
    app.post('/api/v1/billItem', 
    billItemController.creatBillItemAction);
    app.get('/api/v1/billItem', 
    billItemController.fetchAllBillItemAction);
    app.get('/api/v1/billItem/:id', 
      billItemController.getBillItemByIdAction);
    app.put('/api/v1/billItem-time/:id', 
      billItemController.findByIdAndUpdatBillItemAction);            
    app.delete('/api/v1/billItem/:id', 
      billItemController.findByIdDeletBillItemAction);
}
 export default billItemRoutes