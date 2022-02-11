import { Service } from "typedi";
import Car from "../models/Car";
import CarRepository from "../repositories/CarRepository";

@Service()
class CarService {
  async getCars(siteStr: string, ids: any[]) {
    let result:Car[] = [];
    const cars = await this.carRepository.getAllCars(siteStr);
    console.log(ids);
    cars.forEach(car => {
      if (ids.indexOf(`${car.id}`)!=-1) {
        result.push(car)
      }
    })
    return result;
  }
  constructor(private readonly carRepository: CarRepository) { }
  async getAllCars(siteStr: string): Promise<any> {
    let result = null;
    const cars = await this.carRepository.getAllCars(siteStr);
    result = {
      items: cars.sort(function (a, b) {   
        return (a.year.split('/')[0]  as unknown as number) - (b.year.split('/')[0] as unknown as number) || b.price - a.price;
    }),
      filters: getAWholeLotOfFilters(cars)
    };
    return result;
  }
}

export default CarService;


function getAWholeLotOfFilters(cars: Car[]) {
  const cities:string[] = [];
  const states:string[] = [];
  const brands:string[] = [];
  const models:string[] = [];

  //btw this can be a reduce, but enough preemptive engineering for now
  cars.forEach(car => {
    if (!cities.includes(car.city)) {//verify city uniqueness
      cities.push(car.city);
    }    
    if (!states.includes(car.state)) {//verify state uniqueness.
      states.push(car.state);
    }    
    if (!brands.includes(car.brand)) {//verify brand uniqueness..
      brands.push(car.brand);
    }    
    if (!models.includes(car.model)) {//verify model uniqueness...
      models.push(car.model);
    }
  })
  /// Ahhh! wonderful, we collected all the data in linear time... return the object
  return {
    city: cities,
    state: states,
    brand:brands,
    model:models,
  }
}

