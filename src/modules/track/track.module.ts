import { Module } from '@nestjs/common';
import { TrackModel } from './model/track-model';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackModel],
  exports: [TrackModel]
})
export class TrackModule {}
