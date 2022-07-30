import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ARTIST_MESSAGE } from 'src/utils/constant';

export class CreateTrackDto {
  @IsString({ message: ARTIST_MESSAGE.no_fields_required })
  @IsNotEmpty()
  readonly name: string;

  readonly artistId: string | null;

  readonly albumId: string | null;

  @IsNumber()
  @IsNotEmpty({ message: ARTIST_MESSAGE.no_fields_required })
  readonly duration: number;
}
