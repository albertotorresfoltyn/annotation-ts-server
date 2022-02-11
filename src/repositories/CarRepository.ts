import { Service } from "typedi";
import Car from "../models/Car";
const axios = require('axios');

@Service()
class CarRepository {
  async getAllCars(siteStr: string): Promise<Car[]> {
    let result = new Array<Car>();
    try {
      const res = await axios.get(`https://used-cars-api.development.karvi.com.ar/cars/challenge?site=${siteStr}`,{
        headers: {'api-key': '826b5e6c-49cc-4362-a0e3-658dc20fdbf2'}
      })
      result = res.data;
    }  catch (err) {
      console.error(err);
    }
    return result;
  }
}

export default CarRepository;
