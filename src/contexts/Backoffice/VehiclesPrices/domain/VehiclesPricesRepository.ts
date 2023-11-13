import { VehiclesPricesType } from './VehiclesPrices';
import { VehiclesPricesTypeDB } from '../infrastructure/persistence/prisma/VehiclePricesPrismaRepository';

export interface VehiclesPricesRepository {
  create(data: VehiclesPricesType): Promise<void>;

  findLast(): Promise<VehiclesPricesTypeDB>;
}
