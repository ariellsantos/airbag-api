import { VehicleFinder } from '../../../contexts/Backoffice/Vehicle/application/Find/VehicleFinder';

export type GetControllerDataRequest = {
  id: string;
};
export default class GetVehicleController {
  constructor(private readonly vehicleFinder: VehicleFinder) {}

  async exec(dataRequest: GetControllerDataRequest) {
    return await this.vehicleFinder.run({ id: dataRequest.id });
  }
}
