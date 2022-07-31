import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { ARTIST_MESSAGE } from 'src/utils/constant';

export class CreateTrackDto {
  @IsString({ message: ARTIST_MESSAGE.no_fields_required })
  @IsNotEmpty()
  readonly name: string;

  @ValidateIf((value) => value !== null)
  readonly artistId: string | null;

  @ValidateIf((value) => value !== null)
  readonly albumId: string | null;

  @IsNumber()
  @IsNotEmpty({ message: ARTIST_MESSAGE.no_fields_required })
  readonly duration: number;
}
