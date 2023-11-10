import { v4 as uuid } from 'uuid';
import { container } from '../../../../../../../src/Application/dependency-injection/container';
import Driver, { DriverType } from '../../../../../../../src/contexts/Backoffice/Driver/domain/Driver';
import DriverPrismaRepository from '../../../../../../../src/contexts/Backoffice/Driver/infrastructure/persistence/prisma/DriverPrismaRepository';
const prismaConnection = container.resolve('prismaClient');
describe('DriverPrismaRepositoy', () => {
  let driverRepository: DriverPrismaRepository;
  beforeEach(() => {
    driverRepository = new DriverPrismaRepository(prismaConnection);
  });
  beforeEach(async () => {
    // Todo: implement truncate info after tests finished
  });
  it('Should save a driver', async () => {
    const driverInfo: DriverType = {
      id: uuid(),
      name: 'Ariel Santos',
      phone: '1234567890'
    };
    const driver = Driver.create(driverInfo);
    await driverRepository.create({ data: driver.toObject() });
  });

  it('should find a driver registered', async () => {
    const driverInfo: DriverType = {
      id: uuid(),
      name: 'Ariel Santos',
      phone: '1234567890'
    };
    const driver = Driver.create(driverInfo);
    await driverRepository.create({ data: driver.toObject() });
    const driverDb = await driverRepository.findOne(driver.id);
    expect(driverDb).toEqual(driverInfo);
  });
});
