import 'reflect-metadata';
import { Request, Response } from "express";
import express from 'express';
import Container from 'typedi';
import CarController from './controllers/CarController';

const main = async () => {
  const app = express();

  const carController = Container.get(CarController);

  app.get('/endpoint1', (req: Request, res: Response) => carController.getAllCars(req, res));
  app.get('/endpoint2', (req: Request, res: Response) => carController.getCars(req, res));


  app.listen(3000, () => {
    console.log('Server started');
  });
}

main().catch(err => {
  console.error(err);
});