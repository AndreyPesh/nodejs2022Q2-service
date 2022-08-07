import { IsNotEmpty, IsString } from 'class-validator';
import { USER_MESSAGE } from 'src/utils/constant';

export class CreateUserDto {
  @IsNotEmpty({ message: USER_MESSAGE.no_fields_user })
  @IsString({ message: `The login ${USER_MESSAGE.must_be_string}` })
  readonly login: string;

  @IsNotEmpty({ message: USER_MESSAGE.no_fields_user })
  @IsString({ message: `The password ${USER_MESSAGE.must_be_string}` })
  readonly password: string;
}
