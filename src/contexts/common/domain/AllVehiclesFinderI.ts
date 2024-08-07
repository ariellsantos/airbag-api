import { Vehicle } from '../../Backoffice/Vehicle/domain/Vehicle';

export default interface AllVehiclesFinderI {
  run(): Promise<Vehicle[] | []>;
}
