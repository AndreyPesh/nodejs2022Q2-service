import { Module } from '@nestjs/common';
import { AlbumModel } from '../album/model/album-model';
import { ArtistModel } from '../artists/model/artist-model';
import { TrackModel } from '../track/model/track-model';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { FavsModel } from './model/favs-model';

@Module({
  imports: [TrackModel, ArtistModel, AlbumModel],
  controllers: [FavsController],
  providers: [FavsService, FavsModel, TrackModel, ArtistModel, AlbumModel],
})
export class FavsModule {}
