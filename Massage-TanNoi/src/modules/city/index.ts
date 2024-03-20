import express from 'express';
import cityController from './city.controller';

const cityRoutes = (app: express.Application): void => {
    app.post('/api/v1/city', 
    cityController.creatCityAction);
    app.get('/api/v1/city', 
    cityController.fetchAllCityAction);
    app.get('/api/v1/city/:id', 
      cityController.getCityByIdAction);
    app.put('/api/v1/city/:id', 
      cityController.findByIdAndUpdatCityAction);            
    app.delete('/api/v1/city/:id', 
      cityController.findByIdDeletCityAction);
}
 export default cityRoutes