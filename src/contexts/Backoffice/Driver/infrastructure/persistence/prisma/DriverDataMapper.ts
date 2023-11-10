import Driver from '../../../domain/Driver';

export type DriverTypeDB = {
  id: string;
  name: string;
  phone: string;
};
export class DriverDataMapper {
  static mapOne(data: DriverTypeDB): Driver {
    return new Driver(data.id, data.name, data.phone);
  }
}
