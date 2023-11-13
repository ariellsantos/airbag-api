import { VehiclesPricesRepository } from '../../../../../src/contexts/Backoffice/VehiclesPrices/domain/VehiclesPricesRepository';
import { VehiclesPricesType } from '../../../../../src/contexts/Backoffice/VehiclesPrices/domain/VehiclesPrices';
import { VehiclesPricesTypeDB } from '../../../../../src/contexts/Backoffice/VehiclesPrices/infrastructure/persistence/prisma/VehiclePricesPrismaRepository';

export default class VehiclesPricesRepositoryMock implements VehiclesPricesRepository {
  private onCreateMock = jest.fn();
  private onfindLastMock = jest.fn();

  returnOnFindLast(data: VehiclesPricesTypeDB) {
    this.onfindLastMock.mockImplementation(() => {
      return data;
    });
  }

  async create(data: VehiclesPricesType): Promise<void> {
    this.onCreateMock(data);
  }

  async findLast(): Promise<{ id: string; date: Date; view: string }> {
    return this.onfindLastMock();
  }

  assertCreateHaveBeenCalledWith(data: VehiclesPricesType) {
    expect(this.onCreateMock).toHaveBeenCalledWith(data);
  }

  assertFindLastHaveBeenCalled() {
    expect(this.onfindLastMock).toHaveBeenCalled();
  }

  assertCreateNotHaveBeenCalled() {
    expect(this.onCreateMock).not.toHaveBeenCalled();
  }
}
