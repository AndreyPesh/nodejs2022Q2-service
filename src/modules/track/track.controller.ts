import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track-dto';
import { Track } from './interfaces/track-interface';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  async getAllTrack() {
    return this.trackService.getAllTrack();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string): Promise<Track> {
    return this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body() trackData: CreateTrackDto) {
    return this.trackService.createTrack(trackData);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() updateTrackDto: CreateTrackDto) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackById(@Param('id') id: string) {
    return this.trackService.deleteTrackById(id);
  }
}
