import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from 'src/modules/album/dto/create-album-dto';
import { isString } from 'class-validator';

export function createAlbum(albumData: CreateAlbumDto) {
  const id = uuidv4();
  return Object.assign({ id }, albumData);
}

export function validateDataAlbum(albumData: CreateAlbumDto) {
  if (
    albumData.name === undefined ||
    albumData.year === undefined ||
    albumData.artistId === undefined ||
    !isString(albumData.name) ||
    !Number.isInteger(albumData.year)
  ) {
    return false;
  }
  return true;
}
