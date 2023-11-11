import AxiosClient from '../../../../../src/contexts/common/infrastructure/http/AxiosClient';
import { container } from '../../../../../src/Application/dependency-injection/container';
import Logger from '../../../../../src/contexts/common/domain/Logger';
import { ApiRequestError } from '../../../../../src/contexts/common/infrastructure/http/ApiRequestError';

const logger: Logger = container.resolve('logger');
describe('AxiosClient', () => {
  let axiosClient: AxiosClient;
  beforeEach(() => {
    axiosClient = new AxiosClient(logger);
  });
  it('should make a get request successfully', async () => {
    const response = await axiosClient.getRequest('https://google.com');
    expect(response.status).toBe(200);
  });

  it('should throw an error because url is invalid', async () => {
    await expect(async () => {
      await axiosClient.getRequest('htt://google.com');
    }).rejects.toThrowError(new ApiRequestError(`Error Get Request with: AxiosClient`));
  });
});
