import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createDto: CreateUserDto) {

    const newUser = {
      id: uuidv4(),
      ...createDto,
      version: 1,
    };

    const createdUser = this.userRepository.create(newUser);

    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async getUserById(userId: string) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async updateUser(dto: string, userId: string) {}

  async deleteUser(userId: string): Promise<void> {}
}

