import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumModel } from './model/album-model';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumModel]
})
export class AlbumModule {}
