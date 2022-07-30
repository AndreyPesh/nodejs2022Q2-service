import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './modules/album/album.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { FavsModule } from './modules/favs/favs.module';
import { TrackModule } from './modules/track/track.module';
import { UsersModule } from './modules/users/users.module';
import { typeOrmConfig } from './ormconfig';

@Module({
  imports: [
    UsersModule,
    AlbumModule,
    ArtistsModule,
    TrackModule,
    FavsModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
