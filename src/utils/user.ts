import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserPasswordDto } from 'src/modules/users/dto/update-password.dto';
import { User } from 'src/modules/users/interfaces/user-interface';
import { v4 as uuidv4 } from 'uuid';

export function validateDataUser(createUserDto: CreateUserDto) {
  if (
    createUserDto.login === undefined ||
    createUserDto.password === undefined
  ) {
    return false;
  }
  return true;
}

export function validateUpdateData(updateData: UpdateUserPasswordDto) {
  if (
    updateData.newPassword === undefined ||
    updateData.oldPassword === undefined
  ) {
    return false;
  }
  return true;
}

export function generateDataUser(userDto: CreateUserDto): User {
  const { login, password } = userDto;
  const id = uuidv4();
  const version = 1;
  const createdAt = Date.now();
  return { id, login, password, version, createdAt, updatedAt: createdAt };
}

export function deletePasswordFromDataUser(userData: User) {
  const createdUserWithoutPassword = { ...userData };
  delete createdUserWithoutPassword.password;
  return createdUserWithoutPassword;
}

export function updateDataUser(
  currentUser: User,
  updateData: UpdateUserPasswordDto,
) {
  currentUser.password = updateData.newPassword;
  currentUser.version++;
  currentUser.updatedAt = Date.now();
}
