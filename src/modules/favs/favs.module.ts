import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../album/album.module';
import { ArtistsModule } from '../artists/artists.module';
import { TrackModule } from '../track/track.module';
import { FavsEntity } from './entities/favs.entity';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([FavsEntity]),
  ],
  controllers: [FavsController],
  providers: [FavsService],
  exports: [FavsService]
})
export class FavsModule {}
