import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updateUser(id, updatePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
