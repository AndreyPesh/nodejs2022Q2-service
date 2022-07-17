import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/users/model/user-model';
import { USER_MESSAGE } from 'src/utils/constant';
import { validateDataUser, validateUpdateData } from 'src/utils/user';
import { validateId } from 'src/utils/uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userModel: UserModel) {}
  async getAllUsers() {
    return this.userModel.getAllUsers();
  }

  async getUserById(id: string) {
    const isValidId = validateId(id);

    if (!isValidId) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }
    const userData = await this.userModel.getUserById(id);

    if (!userData) {
      throw new HttpException(USER_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }
    return userData;
  }

  async createUser(createUserDto: CreateUserDto) {
    const isDataValid = validateDataUser(createUserDto);
    if (!isDataValid) {
      throw new HttpException(
        USER_MESSAGE.no_fields_user,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userModel.createUser(createUserDto);
  }

  async updateUser(id: string, updateData: UpdateUserPasswordDto) {
    const isValidId = validateId(id);
    const isDataValid = validateUpdateData(updateData);
    if (!isValidId || !isDataValid) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }

    const userData = await this.userModel.getUserById(id);

    if (!userData) {
      throw new HttpException(USER_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }

    const isUpdated = await this.userModel.updateUser(id, updateData);
    if (!isUpdated) {
      throw new HttpException(
        USER_MESSAGE.wrong_old_password,
        HttpStatus.FORBIDDEN,
      );
    }
    return isUpdated;
  }

  async deleteUserById(id: string) {
    const isValidId = validateId(id);

    if (!isValidId) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isUserDeleted = await this.userModel.deleteUserById(id);

    if (!isUserDeleted) {
      throw new HttpException(USER_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }
  }
}
