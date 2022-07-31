import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'The login cannot be empty' })
  @IsString({ message: 'The login must be string' })
  readonly login: string;

  @IsNotEmpty({ message: 'The password cannot be empty' })
  @IsString({ message: 'The password must be string' })
  readonly password: string;
}
