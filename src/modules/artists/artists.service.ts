import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { validateDataArtist, validateUpdateDataArtist } from 'src/utils/artists';
import { ARTIST_MESSAGE, USER_MESSAGE } from 'src/utils/constant';
import { validateId } from 'src/utils/uuid';
import { CreateArtistDto } from './dto/artist-create-dto';
import { ArtistModel } from './model/artist-model';

@Injectable()
export class ArtistsService {
  constructor(private artistsModel: ArtistModel) {}

  async getAllArtists() {
    return this.artistsModel.getAllArtists();
  }

  async getArtistById(id: string) {
    const isValidId = validateId(id);

    if (!isValidId) {
      throw new HttpException(USER_MESSAGE.id_not_valid, HttpStatus.BAD_REQUEST);
    }
    const artistData = await this.artistsModel.getArtistById(id);

    if (!artistData) {
      throw new HttpException(USER_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }
    return artistData;
  }

  async createArtist(artistData: CreateArtistDto) {
    const isDataArtistValid = validateDataArtist(artistData);
    if(!isDataArtistValid) {
      throw new HttpException(ARTIST_MESSAGE.no_fields_required, HttpStatus.BAD_REQUEST);
    }
    return this.artistsModel.addArtist(artistData);
  }

  async updateArtist(id: string, updateData: CreateArtistDto) {
    const isValidId = validateId(id);
    const isDataValid = validateUpdateDataArtist(updateData);
    if (!isValidId || !isDataValid) {
      throw new HttpException(USER_MESSAGE.id_not_valid, HttpStatus.BAD_REQUEST);
    }

    const artistData = await this.artistsModel.getArtistById(id);

    if (!artistData) {
      throw new HttpException(USER_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }

    const isUpdated = await this.artistsModel.updateArtist(id, updateData);
    if(!isUpdated) {
      throw new HttpException(USER_MESSAGE.wrong_old_password, HttpStatus.FORBIDDEN);
    }
    return isUpdated;
  }

  async deleteArtistById(id: string) {
    const isValidId = validateId(id);

    if (!isValidId) {
      throw new HttpException(USER_MESSAGE.id_not_valid, HttpStatus.BAD_REQUEST);
    }

    const isUserDeleted = await this.artistsModel.deleteArtistById(id);
    
    if (!isUserDeleted) {
      throw new HttpException(USER_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }
  }
}
