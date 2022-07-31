import { IsNotEmpty, IsString } from 'class-validator';
import { USER_MESSAGE } from 'src/utils/constant';

export class UpdateUserPasswordDto {
  @IsNotEmpty({ message: USER_MESSAGE.no_fields_user })
  @IsString({ message: `The oldPassword ${USER_MESSAGE.must_be_string}` })
  readonly oldPassword: string;

  @IsNotEmpty({ message: USER_MESSAGE.no_fields_user })
  @IsString({ message: `The newPassword ${USER_MESSAGE.must_be_string}` })
  readonly newPassword: string;
}
