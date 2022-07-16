import { User } from 'src/modules/users/interfaces/user-interface';
import {
  deletePasswordFromDataUser,
  generateDataUser,
  updateDataUser,
} from 'src/utils/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserPasswordDto } from '../dto/update-password.dto';

const users: Array<User> = [];

export class UserModel {
  async getAllUsers() {
    return users;
  }

  async getUserById(id: string) {
    return users.find((user) => user.id === id);
  }

  async createUser(userDto: CreateUserDto) {
    const userData = generateDataUser(userDto);
    users.push(userData);
    const createdUserWithoutPassword = deletePasswordFromDataUser(userData);
    return createdUserWithoutPassword;
  }

  async updateUser(id: string, updateData: UpdateUserPasswordDto) {
    const currentUser = await this.getUserById(id);

    if (currentUser.password !== updateData.oldPassword) {
      return false;
    }
    updateDataUser(currentUser, updateData);
    const createdUserWithoutPassword = deletePasswordFromDataUser(currentUser);
    return createdUserWithoutPassword;
  }

  async deleteUserById(id: string) {
    const indexUserDelete = users.findIndex((user) => user.id === id);
    if (indexUserDelete === -1) {
      return false;
    }
    users.splice(indexUserDelete, 1);
    return true;
  }
}
