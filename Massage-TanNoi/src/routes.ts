import express from 'express';
import employeeRoutes from './modules/employee';
import serviceRoutes from './modules/service';
import customerRoutes from './modules/customer';

export default (app: express.Application): void => {
  employeeRoutes(app),
  serviceRoutes(app),
  customerRoutes(app)
};
