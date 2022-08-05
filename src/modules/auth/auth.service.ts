import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.getUserByName(login, pass);

    if (user && user.password === pass) {
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
