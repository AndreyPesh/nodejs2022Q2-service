import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserPasswordDto } from 'src/modules/users/dto/update-password.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
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

export function generateDataUser(userDto: CreateUserDto) {
  const { login, password } = userDto;
  const id = uuidv4();
  const version = 1;
  const createdAt = Date.now();
  // return { id, login, password, version, createdAt, updatedAt: createdAt };
}

export function deletePasswordFromDataUser(userData: UserEntity) {
  const createdUserWithoutPassword = { ...userData };
  // delete createdUserWithoutPassword.password;
  return createdUserWithoutPassword;
}

export function updateDataUser(
  currentUser: UserEntity,
  updateData: UpdateUserPasswordDto,
) {
  // currentUser.password = updateData.newPassword;
  // currentUser.version++;
  // currentUser.updatedAt = Date.now();
}
