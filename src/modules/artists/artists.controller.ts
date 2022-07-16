import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/artist-create-dto';
import { Artist } from './interfaces/artist-interface';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}
  @Get()
  async getAllArtists() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<Artist> {
    return this.artistsService.getArtistById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArtist(@Body() artistData: CreateArtistDto) {
    return this.artistsService.createArtist(artistData);
  }

  @Put(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updateArtistDto: CreateArtistDto,
  ) {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUserById(@Param('id') id: string) {
    return this.artistsService.deleteArtistById(id);
  }
}
