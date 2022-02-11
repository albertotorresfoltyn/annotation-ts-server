import { Request, Response } from "express";
import { Service } from "typedi";
import CarService from "../services/CarService";

@Service()
class CarController {
  constructor(private readonly carService: CarService) { }
  async getAllCars(_req: Request, res: Response) {
    const siteStr:string = _req.query.site as string;
    const result = await this.carService.getAllCars(siteStr);
    return res.json(result);
  }
  async getCars(_req: Request, res: Response) {
    const idss = _req.query.ids
    const ids= (idss as string)?.split(',');
    const siteStr:string = _req.query.site as string;
    const result = await this.carService.getCars(siteStr, ids);
    return res.json(result);
  }
}

export default  CarController;
