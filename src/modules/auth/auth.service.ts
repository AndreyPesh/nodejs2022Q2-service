import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { PayloadJWT } from './types/interfaces';
import { ERROR_AUTH } from './types/enums';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.usersService.getUserByName(login);

    let isMatchOldPassword = false;
    if (user)
      isMatchOldPassword = await bcrypt.compare(password, user.password);

    if (user && isMatchOldPassword) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException(ERROR_AUTH.FAILED, HttpStatus.FORBIDDEN);
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto.login, userDto.password);
    const payload: PayloadJWT = { login: user.login, id: user.id };
    return await this.newRefreshAndAccessToken(payload);
  }

  async signup(userData: CreateUserDto) {
    await this.usersService.createUser(userData);
  }

  private async newRefreshAndAccessToken(
    payload: PayloadJWT,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return {
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException(ERROR_AUTH.BAD_REQUEST, HttpStatus.UNAUTHORIZED);
    }
    try {
      const decoded = this.jwtService.verify<PayloadJWT>(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      const user = await this.usersService.getUserById(decoded.id);
      const { id, login } = user;
      return await this.newRefreshAndAccessToken({ id, login });
    } catch {
      throw new HttpException(
        ERROR_AUTH.ERROR_REFRESH,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
