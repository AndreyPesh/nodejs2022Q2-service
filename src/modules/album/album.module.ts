import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsModel } from '../favs/model/favs-model';
import { TrackModel } from '../track/model/track-model';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entities/album.entity';

@Module({
  imports: [TrackModel, FavsModel, TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumController],
  providers: [AlbumService, TrackModel, FavsModel],
})
export class AlbumModule {}
