import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FavsService } from './favs.service';

@Controller('favs')
@UseGuards(JwtAuthGuard)
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async getAllArtists() {
    return this.favsService.getAllFavs();
  }

  @Post('track/:id')
  async addFavsTrack(@Param('id') id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavorite(@Param('id') id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Post('artist/:id')
  async addFavsArtist(@Param('id') id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavorite(@Param('id') id: string) {
    return this.favsService.deleteArtist(id);
  }

  @Post('album/:id')
  async addFavsAAlbum(@Param('id') id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavorite(@Param('id') id: string) {
    return this.favsService.deleteAlbum(id);
  }
}
