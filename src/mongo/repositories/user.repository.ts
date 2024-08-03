import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';

type Create = {
  name: string;
  age: number;
};

export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private model: Model<User>,
  ) {}

  async create({ age, name }: Create) {
    return await this.model.create({ age, name });
  }
}
