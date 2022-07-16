import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './modules/album/album.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { TrackModule } from './modules/track/track.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, ArtistsModule, TrackModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
