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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTrackDto } from './dto/create-track-dto';
import { TrackService } from './track.service';

@Controller('track')
@UseGuards(JwtAuthGuard)
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  async getAllTrack() {
    return this.trackService.getAllTrack();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
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
