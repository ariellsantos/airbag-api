export type DriverType = {
  id: string;
  name: string;
  phone: string;
};
export default class Driver {
  readonly id: string;
  readonly name: string;
  readonly phone: string;

  constructor(id: string, name: string, phone: string) {
    this.id = id;
    this.name = name;
    this.phone = phone;
  }

  static create(info: DriverType): Driver {
    return new Driver(info.id, info.name, info.phone);
  }

  toObject(): DriverType {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone
    };
  }
}
