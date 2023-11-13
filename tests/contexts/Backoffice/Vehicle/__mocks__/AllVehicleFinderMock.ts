import AllVehiclesFinderI from '../../../../../src/contexts/common/domain/AllVehiclesFinderI';
import { Vehicle } from '../../../../../src/contexts/Backoffice/Vehicle/domain/Vehicle';

export default class AllVehicleFinderMock implements AllVehiclesFinderI {
  private onRunMock = jest.fn();

  returnOnRunCall(vehicles: Vehicle[] | []) {
    this.onRunMock.mockImplementation(() => {
      return vehicles;
    });
  }

  async run(): Promise<Vehicle[] | []> {
    return this.onRunMock();
  }

  assertOnRunHaveBeenCalled() {
    expect(this.onRunMock).toHaveBeenCalled();
  }
}
