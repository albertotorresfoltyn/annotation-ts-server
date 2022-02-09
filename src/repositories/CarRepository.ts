import { Service } from "typedi";
import Car from "../models/Car";
const axios = require('axios');

@Service()
class CarRepository {
  async getAllCars(): Promise<Car[]> {
    let result = new Array<Car>();
    try {
      const res = await axios.get('https://used-cars-api.development.karvi.com.ar/cars/challenge?site=br',{
        headers: {'api-key': '826b5e6c-49cc-4362-a0e3-658dc20fdbf2'}
      })
      result = res.data;
      /*result = [
        {
            "id": 315688,
            "city": "Santos",
            "state": "SP",
            "year": "2015/2016",
            "brand": "TOYOTA",
            "model": "COROLLA",
            "version": "2.0 ALTIS 16V FLEX 4P AUTOMATICO",
            "price": 100990,
            "mileage": 53495,
            "image": "https://photo-b2b-autoaction.storage.googleapis.com/autoaction_prod/78859435-f607-892a-2a52-fdff357a84e2-011jpg.jpg",
            "certificate": true,
            "promoted": false
        },
        {
            "id": 332379,
            "city": "Feira de Santana",
            "state": "BA",
            "year": "2018/2019",
            "brand": "PEUGEOT",
            "model": "3008",
            "version": "1.6 GRIFFE PACK THP 16V GASOLINA 4P AUTOMATICO",
            "price": 154700,
            "mileage": 73261,
            "image": "https://photo-b2b-autoaction.storage.googleapis.com/autoaction_prod/04ff20dc-971a-546f-93ac-2cdea9471e50-1jpg.jpg",
            "certificate": false,
            "promoted": false
        }
    ]*/
    }  catch (err) {
      console.error(err);
    }
    return result;
  }
}

export default CarRepository;
