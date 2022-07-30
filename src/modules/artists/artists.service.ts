import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ARTIST_MESSAGE, USER_MESSAGE } from 'src/utils/constant';
import { validateId } from 'src/utils/uuid';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/artist-create-dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  validateId(id: string) {
    if (!validateId(id)) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getArtist(id: string) {
    const artistData = await this.artistRepository.findOne({ where: { id } });

    if (!artistData) {
      throw new HttpException(ARTIST_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }
    return artistData;
  }

  async getAllArtists() {
    return this.artistRepository.find();
  }

  async getArtistById(id: string) {
    this.validateId(id);
    return await this.getArtist(id);
  }

  async createArtist(artistData: CreateArtistDto) {
    const newArtist = this.artistRepository.create(artistData);

    return await this.artistRepository.save(newArtist);
  }

  async updateArtist(id: string, updateData: CreateArtistDto) {
    this.validateId(id);
    await this.getArtist(id);

    await this.artistRepository.update(id, updateData);

    return await this.getArtist(id);
  }

  async deleteArtistById(id: string) {
    this.validateId(id);
    await this.getArtist(id);
    return this.artistRepository.delete(id);
  }
}
