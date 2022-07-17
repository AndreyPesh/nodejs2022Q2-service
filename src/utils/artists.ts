import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from 'src/modules/artists/dto/artist-create-dto';
import { Artist } from 'src/modules/artists/interfaces/artist-interface';
import { isBoolean } from 'class-validator';

export function validateDataArtist(createArtistDto: CreateArtistDto) {
  if (
    createArtistDto.name === undefined ||
    createArtistDto.grammy === undefined
  ) {
    return false;
  }
  return true;
}

export function createArtist(artistDto: CreateArtistDto): Artist {
  const { name, grammy } = artistDto;
  const id = uuidv4();
  return { id, name, grammy };
}

export function validateUpdateDataArtist(updateData: CreateArtistDto) {
  if (
    updateData.name === undefined ||
    updateData.grammy === undefined ||
    !isBoolean(updateData.grammy)
  ) {
    return false;
  }
  return true;
}
