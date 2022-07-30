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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Get()
  async getAllArtists() {
    return this.albumService.getAllAlbum();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string) {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArtist(@Body() albumData: CreateAlbumDto) {
    return this.albumService.createAlbum(albumData);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() updateAlbumDto: CreateAlbumDto) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUserById(@Param('id') id: string) {
    return this.albumService.deleteAlbumById(id);
  }
}
