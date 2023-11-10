import { VehicleRepository } from '../../../../../src/contexts/Backoffice/Vehicle/domain/VehicleRepository';
import { VehicleType, Vehicle } from '../../../../../src/contexts/Backoffice/Vehicle/domain/Vehicle';

export class VehicleRepositoryMock implements VehicleRepository {
  private mockCreate = jest.fn();
  private mockDelete = jest.fn();
  private mockfindOne = jest.fn();

  returnOnFindOne(vehicle: Vehicle) {
    this.mockfindOne.mockImplementation(() => {
      return vehicle;
    });
  }

  throwErrorOnFindOne(error: Error) {
    this.mockfindOne.mockImplementation(() => {
      throw error;
    });
  }
  async create(data: VehicleType): Promise<void> {
    this.mockCreate(data);
  }

  async delete(id: string): Promise<void> {
    this.mockDelete(id);
  }

  async findOne(id: string): Promise<Vehicle> {
    return this.mockfindOne(id);
  }
  assertFindOneHasBeenCalledWith(id: string) {
    expect(this.mockfindOne).toHaveBeenCalledWith(id);
  }
}
