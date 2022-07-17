import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validateDataAlbum } from 'src/utils/albums';
import { ALBUM_MESSAGE, ARTIST_MESSAGE, USER_MESSAGE } from 'src/utils/constant';
import { validateId } from 'src/utils/uuid';
import { FavsModel } from '../favs/model/favs-model';
import { TrackModel } from '../track/model/track-model';
import { CreateAlbumDto } from './dto/create-album-dto';
import { AlbumModel } from './model/album-model';

@Injectable()
export class AlbumService {
  constructor(
    private albumModel: AlbumModel,
    private trackModel: TrackModel,
    private favsModel: FavsModel,
  ) {}
  async getAllAlbum() {
    return this.albumModel.getAllAlbums();
  }

  async getAlbumById(id: string) {
    const isValidId = validateId(id);

    if (!isValidId) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }
    const albumData = await this.albumModel.getAlbumById(id);

    if (!albumData) {
      throw new HttpException(ALBUM_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }
    return albumData;
  }

  async createAlbum(albumData: CreateAlbumDto) {
    const isDataArtistValid = validateDataAlbum(albumData);
    if (!isDataArtistValid) {
      throw new HttpException(
        ARTIST_MESSAGE.no_fields_required,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.albumModel.addAlbum(albumData);
  }

  async updateAlbum(id: string, updateData: CreateAlbumDto) {
    const isValidId = validateId(id);
    const isDataValid = validateDataAlbum(updateData);
    if (!isValidId || !isDataValid) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }

    const albumData = await this.albumModel.getAlbumById(id);

    if (!albumData) {
      throw new HttpException(ALBUM_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }

    const isUpdated = await this.albumModel.updateAlbum(id, updateData);
    if (!isUpdated) {
      throw new HttpException(
        USER_MESSAGE.wrong_old_password,
        HttpStatus.FORBIDDEN,
      );
    }
    return isUpdated;
  }

  async deleteAlbumById(id: string) {
    const isValidId = validateId(id);

    if (!isValidId) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isAlbumDeleted = await this.albumModel.deleteAlbumById(id);

    if (!isAlbumDeleted) {
      throw new HttpException(ALBUM_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }
    const listTracks = await this.trackModel.getAllTrack();
    listTracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
    const listFavs = await this.favsModel.getAllFavs();
    listFavs.albums.forEach((album, index) => {
      if (album.id === id) {
        listFavs.albums.splice(index, 1);
      }
    });
  }
}
