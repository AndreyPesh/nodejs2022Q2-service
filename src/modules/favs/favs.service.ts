import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ALBUM_MESSAGE, ARTIST_MESSAGE, TRACK_MESSAGE, USER_MESSAGE } from 'src/utils/constant';
import { validateId } from 'src/utils/uuid';
import { AlbumModel } from '../album/model/album-model';
import { ArtistModel } from '../artists/model/artist-model';
import { TrackModel } from '../track/model/track-model';
import { FavsModel } from './model/favs-model';

@Injectable()
export class FavsService {
  constructor(
    private favsModel: FavsModel,
    private trackModel: TrackModel,
    private artistModel: ArtistModel,
    private albumModel: AlbumModel,
  ) {}

  async getAllFavs() {
    return this.favsModel.getAllFavs();
  }

  async checkId(id: string) {
    const isValidId = validateId(id);

    if (!isValidId) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }
    return;
  }

  async addTrack(id: string) {
    await this.checkId(id);
    const trackData = await this.trackModel.getTrackById(id);

    if (!trackData) {
      throw new HttpException(
        TRACK_MESSAGE.not_found,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favsModel.addTrack(trackData);
    return trackData;
  }

  async deleteTrack(id: string) {
    await this.checkId(id);
    const isTrackDeleted = await this.favsModel.deleteTrack(id);
    if (!isTrackDeleted) {
      throw new HttpException('Track is not favorite', HttpStatus.NOT_FOUND);
    }
  }

  async addArtist(id: string) {
    await this.checkId(id);
    const artistData = await this.artistModel.getArtistById(id);

    if (!artistData) {
      throw new HttpException(
        ARTIST_MESSAGE.not_found,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favsModel.addArtist(artistData);
    return artistData;
  }

  async deleteArtist(id: string) {
    await this.checkId(id);
    const isArtistDeleted = await this.favsModel.deleteArtist(id);
    if (!isArtistDeleted) {
      throw new HttpException('Artist is not favorite', HttpStatus.NOT_FOUND);
    }
  }

  async addAlbum(id: string) {
    await this.checkId(id);
    const albumData = await this.albumModel.getAlbumById(id);

    if (!albumData) {
      throw new HttpException(
        ALBUM_MESSAGE.not_found,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    await this.favsModel.addAlbum(albumData);
    return albumData;
  }

  async deleteAlbum(id: string) {
    await this.checkId(id);
    const isAlbumDeleted = await this.favsModel.deleteAlbum(id);
    if (!isAlbumDeleted) {
      throw new HttpException('Album is not favorite', HttpStatus.NOT_FOUND);
    }
  }
}
