import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return await this.appService.get();
  }

  @Post('async')
  async createUser(@Body() input) {
    return await this.appService.create(input.name, input.age);
  }
}
