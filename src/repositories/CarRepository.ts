import { Service } from "typedi";
import Car from "../models/Car";
import dotenv from "dotenv"

dotenv.config();
const axios = require('axios');


@Service()
class CarRepository {
  async getAllCars(siteStr: string): Promise<Car[]> {
    let result = new Array<Car>();
    try {
      const res = await axios.get(`${process.env.DATA_ORIGIN_URL}?site=${siteStr}`,{
        headers: {'api-key': process.env.APIKEY}
      });
      result = res.data;
    } catch (err) {
      console.error(err);
    }
    return result;
  }
}

export default CarRepository;
