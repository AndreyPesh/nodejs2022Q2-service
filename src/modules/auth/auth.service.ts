import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.getUserByName(login);
    
    let isMatchOldPassword = false;
    if (user) isMatchOldPassword = await bcrypt.compare(pass, user.password);

    if (user && isMatchOldPassword) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('Authentication failed ', HttpStatus.FORBIDDEN);
  }

  async login(user: any) {
    const payload = { login: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(userData: CreateUserDto) {
    await this.usersService.createUser(userData);
  }
}
