import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ARTIST_MESSAGE } from 'src/utils/constant';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty({ message: ARTIST_MESSAGE.no_fields_required })
  readonly name: string;

  @IsBoolean()
  @IsNotEmpty({ message: ARTIST_MESSAGE.no_fields_required })
  readonly grammy: boolean;
}
