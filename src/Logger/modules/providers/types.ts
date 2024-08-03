export type MongooseProvider = {
  name: 'mongoose';
  blackList: Array<'create' | 'delete' | '...'>;
};

export type HttpProvider = {
  name: 'http';
  ignorePatterns?: Array<string>;
};

export type RabbitProvider = {
  name: 'rmq';
};

export type Provider = MongooseProvider | HttpProvider;
