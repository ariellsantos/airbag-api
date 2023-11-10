import { Prisma } from '@prisma/client';

export type VehicleType = {
  id: string;
  plates: string;
  vin: string;
  brand: string;
  vehicleType: string;
  price: Prisma.Decimal;
};
export class Vehicle {
  readonly id: string;
  readonly plates: string;
  readonly vin: string;
  readonly brand: string;
  readonly vehicleType: string;
  readonly price: Prisma.Decimal;

  constructor(id: string, plates: string, vin: string, brand: string, vehicleType: string, price: Prisma.Decimal) {
    this.id = id;
    this.plates = plates;
    this.vin = vin;
    this.brand = brand;
    this.vehicleType = vehicleType;
    this.price = price;
  }

  static register(info: {
    id: string;
    plates: string;
    vin: string;
    brand: string;
    vehicleType: string;
    price: Prisma.Decimal;
  }): Vehicle {
    return new Vehicle(info.id, info.plates, info.vin, info.brand, info.vehicleType, info.price);
  }

  toObject(): VehicleType {
    return {
      id: this.id,
      plates: this.plates,
      vin: this.vin,
      brand: this.brand,
      vehicleType: this.vehicleType,
      price: this.price
    };
  }
}
