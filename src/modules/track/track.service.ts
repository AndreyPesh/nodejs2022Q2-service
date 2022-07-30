import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { USER_MESSAGE, TRACK_MESSAGE } from 'src/utils/constant';
import { CreateTrackDto } from './dto/create-track-dto';
import { TrackEntity } from './entities/track.entity';
import { validateId } from 'src/utils/uuid';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  validateId(id: string) {
    if (!validateId(id)) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getTrackPure(id: string) {
    const trackData = await this.trackRepository.findOne({ where: { id } });

    if (!trackData) {
      return false;
    }
    return trackData;
  }

  async getTrack(id: string) {
    const trackData = await this.trackRepository.findOne({ where: { id } });
    if (!trackData) {
      throw new HttpException(TRACK_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }
    return trackData;
  }

  async getAllTrack() {
    return this.trackRepository.find();
  }

  async getTrackById(id: string) {
    this.validateId(id);
    return await this.getTrack(id);
  }

  async createTrack(trackData: CreateTrackDto) {
    const newTrack = this.trackRepository.create(trackData);
    return await this.trackRepository.save(newTrack);
  }

  async updateTrack(id: string, updateData: CreateTrackDto) {
    this.validateId(id);
    await this.getTrack(id);
    await this.trackRepository.update(id, updateData);
    return await this.getTrack(id);
  }

  async deleteTrackById(id: string) {
    this.validateId(id);
    await this.getTrack(id);
    return await this.trackRepository.delete(id);
  }
}
