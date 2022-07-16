import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ARTIST_MESSAGE, USER_MESSAGE } from 'src/utils/constant';
import { validateDataTrack } from 'src/utils/track';
import { validateId } from 'src/utils/uuid';
import { CreateTrackDto } from './dto/create-track-dto';
import { TrackModel } from './model/track-model';

@Injectable()
export class TrackService {
  constructor(private trackModel: TrackModel) {}

  async getAllTrack() {
    return this.trackModel.getAllTrack();
  }

  async getTrackById(id: string) {
    const isValidId = validateId(id);

    if (!isValidId) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }
    const trackData = await this.trackModel.getTrackById(id);

    if (!trackData) {
      throw new HttpException(USER_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }
    return trackData;
  }

  async createTrack(trackData: CreateTrackDto) {
    const isDataTrackValid = validateDataTrack(trackData);
    if (!isDataTrackValid) {
      throw new HttpException(
        ARTIST_MESSAGE.no_fields_required,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.trackModel.addTrack(trackData);
  }

  async updateTrack(id: string, updateData: CreateTrackDto) {
    const isValidId = validateId(id);
    const isDataValid = validateDataTrack(updateData);
    if (!isValidId || !isDataValid) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }

    const trackData = await this.trackModel.getTrackById(id);

    if (!trackData) {
      throw new HttpException(USER_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }

    const isUpdated = await this.trackModel.updateTrack(id, updateData);
    if (!isUpdated) {
      throw new HttpException(
        USER_MESSAGE.wrong_old_password,
        HttpStatus.FORBIDDEN,
      );
    }
    return isUpdated;
  }

  async deleteTrackById(id: string) {
    const isValidId = validateId(id);

    if (!isValidId) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isTrackDeleted = await this.trackModel.deleteTrackById(id);

    if (!isTrackDeleted) {
      throw new HttpException(USER_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }
  }
}
