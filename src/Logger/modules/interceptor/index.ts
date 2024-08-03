import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppStorage } from '../async-storage/async-storage.type';
import { AppLogger } from '../logger';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private asyncStorage: AppStorage,
    private logger: AppLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const obj = this.generateLogObject(req);
    this.logger.log({
      ...obj,
      type: 'REQUEST',
    });

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.log({
          ...obj,
          type: 'RESPONSE',
          time: `${Date.now() - now}ms`,
        });
      }),
    );
  }

  private generateLogObject(req: Request) {
    return {
      id: this.asyncStorage.getStore().requestId,
      requestBody: req.body,
      path: req.path,
    };
  }
}
