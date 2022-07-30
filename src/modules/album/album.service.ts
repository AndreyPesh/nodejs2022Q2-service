import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ALBUM_MESSAGE, USER_MESSAGE } from 'src/utils/constant';
import { validateId } from 'src/utils/uuid';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  validateAlbumId(id: string) {
    if (!validateId(id)) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAlbumPure(id: string) {
    const albumData = await this.albumRepository.findOne({ where: { id } });

    if (!albumData) {
      return false;
    }
    return albumData;
  }

  async getAlbum(id: string) {
    const albumData = await this.albumRepository.findOne({
      where: { id },
    });

    if (!albumData) {
      throw new HttpException(ALBUM_MESSAGE.not_found, HttpStatus.NOT_FOUND);
    }
    return albumData;
  }

  async getAllAlbum() {
    return this.albumRepository.find();
  }

  async getAlbumById(id: string) {
    this.validateAlbumId(id);
    return await this.getAlbum(id);
  }

  async createAlbum(albumData: CreateAlbumDto) {
    
    const newAlbum = this.albumRepository.create({...albumData});
    
    return await this.albumRepository.save(newAlbum);
  }

  async updateAlbum(id: string, updateData: CreateAlbumDto) {
    this.validateAlbumId(id);

    await this.getAlbumById(id);

    await this.albumRepository.update(id, updateData);
    
    return await this.getAlbum(id);
  }

  async deleteAlbumById(id: string) {
    this.validateAlbumId(id);
    await this.getAlbum(id);
    return await this.albumRepository.delete(id);
  }
}
