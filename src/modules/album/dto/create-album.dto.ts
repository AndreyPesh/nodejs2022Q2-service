import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { USER_MESSAGE } from 'src/utils/constant';

export class CreateAlbumDto {
  @IsNotEmpty({ message: USER_MESSAGE.no_fields_user })
  @IsString({ message: `The name ${USER_MESSAGE.must_be_string}` })
  readonly name: string;

  @IsNotEmpty({ message: USER_MESSAGE.no_fields_user })
  @IsNumber()
  readonly year: number;

  @ValidateIf((value) => value !== null)
  readonly artistId!: string | null;
}
