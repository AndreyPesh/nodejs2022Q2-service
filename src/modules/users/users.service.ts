import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { validateId } from 'src/utils/uuid';
import { USER_MESSAGE, VALUE_START_VERSION } from 'src/utils/constant';
import { UpdateUserPasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  validateId(id: string) {
    if (!validateId(id)) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUserData(id: string) {
    const userData = await this.userRepository.findOne({
      where: { id },
    });

    if (!userData) {
      throw new HttpException(USER_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }

    return userData;
  }

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async getUserById(userId: string) {
    this.validateId(userId);

    const userData = await this.getUserData(userId);

    return userData.toResponse();
  }

  async createUser(createDataUserDto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      ...createDataUserDto,
      version: VALUE_START_VERSION,
    };

    const createdUser = this.userRepository.create(newUser);

    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async updateUser(userId: string, updateData: UpdateUserPasswordDto) {
    this.validateId(userId);

    const userData = await this.getUserData(userId);

    if (userData.password !== updateData.oldPassword) {
      throw new HttpException(
        USER_MESSAGE.wrong_old_password,
        HttpStatus.FORBIDDEN,
      );
    }
    userData.version++;
    userData.password = updateData.newPassword;
    return (await this.userRepository.save(userData)).toResponse();
  }

  async deleteUserById(userId: string) {
    this.validateId(userId);

    await this.getUserData(userId);

    await this.userRepository.delete(userId);
  }
}
