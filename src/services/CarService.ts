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
      filters: {
        city: getUniqueCities(cars),
        state: getUniqueStates(cars),
        brand:getUniqueBrands(cars),
        model:getUniqueModels(cars)
      }
    };
    return result;
  }
}

export default CarService;
function getUniqueModels(cars: Car[]) {
  return getUniqueValuesForField('model', cars);
}

function getUniqueCities(cars: Car[]) {
  return getUniqueValuesForField('city', cars);
}

function getUniqueStates(cars: Car[]) {
  return getUniqueValuesForField('state', cars);
}

function getUniqueBrands(cars: Car[]) {
  return getUniqueValuesForField('brand', cars);
}

function getUniqueValuesForField(field: any, cars: Car[]) {
  let result:any[]= [];
  cars.forEach(car => {
    if (!result.includes(car[field as keyof typeof car])) {
      result.push(car[field as keyof typeof car]);
    }
  })
  return result;
}

