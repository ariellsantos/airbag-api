import CurrencyRate from '../../domain/CurrencyRate';
import Logger from '../../../../common/domain/Logger';
import { Prisma } from '@prisma/client';
import { HttpClient, ResponseHttpClient } from '../../../../common/infrastructure/http/AxiosClient';
import { OpenExchangeConfig } from '../../../../../Application/configs/configFactory';

interface CurrencyExchangeRateService {
  getLastCurrencyRates(...currencies: string[]): Promise<CurrencyRate[]>;
}

type OpenExchangeResponseType = {
  rates: {
    [code: string]: number;
  };
};

export default class OpenExchangeService implements CurrencyExchangeRateService {
  constructor(
    private readonly config: OpenExchangeConfig,
    private readonly httpClient: HttpClient<ResponseHttpClient>,
    private readonly logger: Logger
  ) {}

  async getLastCurrencyRates(...currencies: string[]): Promise<CurrencyRate[]> {
    try {
      const response = await this.httpClient.getRequest(`${this.config.baseUrl}/latest.json`, {
        params: {
          app_id: this.config.appId,
          symbols: currencies.join(',')
        }
      });
      const data = response.data as OpenExchangeResponseType;
      this.logger.debug(currencies.join(','));
      this.logger.debug(JSON.stringify(data));
      const currencyRates: CurrencyRate[] = [];

      const mxnXusd = this.reversMXNtoUSD(data.rates.MXN, data.rates.USD);

      delete data.rates.MXN;
      for (const [code, rate] of Object.entries(data.rates)) {
        const mxnRate = this.calculateCrossRateExchange(mxnXusd, rate);
        currencyRates.push(new CurrencyRate(code, new Prisma.Decimal(mxnRate)));
      }
      return currencyRates;
    } catch (error) {
      this.logger.error(error as Error);
      throw new Error('Error from here');
    }
  }

  private calculateCrossRateExchange(mxnRate: number, otherExchangeRate: number): number {
    return mxnRate * otherExchangeRate;
  }

  private reversMXNtoUSD(mxn: number, usd: number): number {
    return usd / mxn;
  }
}
