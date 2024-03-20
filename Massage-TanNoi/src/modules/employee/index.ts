import express from 'express';
import employeeController from './employee.controller';

const employeeRoutes = (app: express.Application): void => {
    app.post('/api/v1/employee', 
    employeeController.creatEmployeeAction);
    app.get('/api/v1/employee', 
    employeeController.fetchAllEmployeeAction);
    app.get('/api/v1/employee/:id', 
      employeeController.getEmployeeByIdAction);
    app.put('/api/v1/employee-time/:id', 
      employeeController.findByIdAndUpdatEmployeeAction);            
    app.delete('/api/v1/employee/:id', 
      employeeController.findByIdDeletEmployeeAction);
}
 export default employeeRoutes