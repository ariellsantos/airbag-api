import { Vehicle, VehicleType } from './Vehicle';

export interface VehicleRepository {
  findOne(id: string): Promise<Vehicle>;
  delete(id: string): Promise<void>;
  create(data: VehicleType): Promise<void>;
}
