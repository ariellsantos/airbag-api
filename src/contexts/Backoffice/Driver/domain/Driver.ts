export default class Driver {
  readonly id: string;
  readonly name: string;
  readonly phone: string;

  constructor(id: string, name: string, phone: string) {
    this.id = id;
    this.name = name;
    this.phone = name;
  }
}
