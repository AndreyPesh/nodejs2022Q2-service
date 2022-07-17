import { Module } from '@nestjs/common';
import { FavsModel } from '../favs/model/favs-model';
import { TrackModel } from './model/track-model';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [FavsModel],
  controllers: [TrackController],
  providers: [TrackService, TrackModel, FavsModel],
  exports: [TrackModel],
})
export class TrackModule {}
