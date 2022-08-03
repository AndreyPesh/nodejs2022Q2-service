import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { AppService } from './app.service';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body, @Request() req) {
    console.log(body);

    return this.authService.login(req.user);
  }
}

