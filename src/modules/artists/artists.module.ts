import { Module } from '@nestjs/common';
import { AlbumModel } from '../album/model/album-model';
import { FavsModel } from '../favs/model/favs-model';
import { TrackModel } from '../track/model/track-model';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistModel } from './model/artist-model';

@Module({
  imports: [TrackModel, AlbumModel, FavsModel],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistModel, TrackModel, AlbumModel, FavsModel],
  exports: [ArtistModel],
})
export class ArtistsModule {}
