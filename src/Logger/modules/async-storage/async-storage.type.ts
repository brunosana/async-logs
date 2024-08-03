import { AsyncLocalStorage } from 'async_hooks';

export abstract class AppStorage extends AsyncLocalStorage<{
  requestId: string;
  userId?: string;
}> {}
