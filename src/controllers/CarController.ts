import { Request, Response } from "express";
import { Service } from "typedi";
import CarService from "../services/CarService";

@Service()
class CarController {
  constructor(private readonly carService: CarService) { }
  async getAllCars(_req: Request, res: Response) {
    const result = await this.carService.getAllCars();
    return res.json(result);
  }
  async getCars(_req: Request, res: Response) {
    const idss = _req.query.ids
    const ids= (idss as string)?.split(',');
    console.log(ids)
    const result = await this.carService.getCars(ids);
    return res.json(result);
  }
}

export default  CarController;
