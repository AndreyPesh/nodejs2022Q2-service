import { Module } from '@nestjs/common';
import { FavsModel } from '../favs/model/favs-model';
import { TrackModel } from '../track/model/track-model';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumModel } from './model/album-model';

@Module({
  imports: [TrackModel, FavsModel],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumModel, TrackModel, FavsModel],
  exports: [AlbumModel],
})
export class AlbumModule {}
