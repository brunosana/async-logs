import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExternalApiService {
  constructor(private readonly httpClient: HttpService) {}

  async get() {
    return lastValueFrom(this.httpClient.get(`/urlLegal`));
  }
}
