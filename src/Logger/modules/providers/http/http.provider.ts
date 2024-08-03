import { Injectable } from '@nestjs/common';
import { AppStorage } from '../../async-storage/async-storage.type';
import { AppLogger } from '../../logger';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

@Injectable()
export class Httprovider {
  constructor(
    private readonly localStorage: AppStorage,
    private readonly logger: AppLogger,
  ) {}

  async onRequest(
    req: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> {
    const id = this.localStorage.getStore().requestId;
    const { baseURL, params } = req;
    this.logger.log({
      id,
      type: 'axios-request',
      baseURL,
      params,
    });
    return req;
  }

  async onRequestRejected(req: any): Promise<InternalAxiosRequestConfig> {
    const id = this.localStorage.getStore().requestId;
    this.logger.log({
      id,
      type: 'axios-request',
      reason: 'rejected',
    });
    return req;
  }

  async onResponse(res: AxiosResponse) {
    const id = this.localStorage.getStore().requestId;
    const { status } = res;
    this.logger.log({ id, type: 'axios-request', status });
    return res;
  }

  async onResponseError(error: AxiosError) {
    const id = this.localStorage.getStore().requestId;
    const { message, code } = error;
    this.logger.log({ id, type: 'axios-request', message, code });
    throw error;
  }
}
