import axios, { AxiosResponse } from 'axios';
import Logger from '../../domain/Logger';
import { ApiRequestError } from './ApiRequestError';

export type RequestParamsType = {
  headers?: object;
  params?: object;
  data?: object;
};

export type ResponseHttpClient = {
  data: unknown;
  status: number;
};

export interface HttpClient<R extends ResponseHttpClient> {
  getRequest(url: string, requestParams: RequestParamsType): Promise<R>;
}

export default class AxiosClient implements HttpClient<AxiosResponse> {
  constructor(private readonly logger: Logger) {}
  async getRequest(url: string, requestParams: RequestParamsType = {}): Promise<AxiosResponse> {
    try {
      return await axios.get(url, requestParams);
    } catch (error) {
      this.logger.error(error as Error);
      throw new ApiRequestError(`Error Get Request with: ${AxiosClient.name}`);
    }
  }
}
