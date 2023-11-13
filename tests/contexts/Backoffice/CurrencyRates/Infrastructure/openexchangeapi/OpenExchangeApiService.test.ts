import OpenExchangeService from '../../../../../../src/contexts/Backoffice/CurrencyRates/infrastructure/openexchangeapi/OpenExchangeApiService';
import { container } from '../../../../../../src/Application/dependency-injection/container';
import Logger from '../../../../../../src/contexts/common/domain/Logger';
import { HttpClient } from '../../../../../../src/contexts/common/infrastructure/http/AxiosClient';
import CurrencyRate from '../../../../../../src/contexts/Backoffice/CurrencyRates/domain/CurrencyRate';
import { OpenExchangeConfig } from '../../../../../../src/Application/configs/configFactory';

const logger: Logger = container.resolve('logger');
const config: OpenExchangeConfig = container.resolve('openExchangeConfig');
const httpClient: HttpClient<any> = container.resolve('httpClient');
describe('OpenExchangeApi', () => {
  it('should return the reates for currencies provided', async () => {
    const openExchangeService = new OpenExchangeService(config, httpClient, logger);

    const response: CurrencyRate[] = await openExchangeService.getLastCurrencyRates('GBP', 'USD', 'EUR', 'MXN');
    expect(response.length).toBe(3);
    expect(response.every(e => e instanceof CurrencyRate)).toBeTruthy();
  });
});
