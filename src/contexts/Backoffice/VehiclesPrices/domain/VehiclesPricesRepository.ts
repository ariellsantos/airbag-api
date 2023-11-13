import { VehiclesPricesType } from './VehiclesPrices';

export interface VehiclesPricesRepository {
  create(data: VehiclesPricesType): Promise<void>;

  findLast(): Promise<{ id: string; date: Date; view: string }>;
}
