import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistModel } from './model/artist-model';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistModel],
})
export class ArtistsModule {}
