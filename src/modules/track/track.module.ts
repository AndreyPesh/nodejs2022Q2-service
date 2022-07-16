import { Module } from '@nestjs/common';
import { TrackModel } from './model/track-model';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackModel]
})
export class TrackModule {}
