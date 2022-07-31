import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ALBUM_MESSAGE,
  ARTIST_MESSAGE,
  TRACK_MESSAGE,
  USER_MESSAGE,
} from 'src/utils/constant';
import { validateId } from 'src/utils/uuid';
import { Repository } from 'typeorm';
import { AlbumService } from '../album/album.service';
import { AlbumEntity } from '../album/entities/album.entity';
import { ArtistsService } from '../artists/artists.service';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { TrackService } from '../track/track.service';
import { FavsEntity } from './entities/favs.entity';

@Injectable()
export class FavsService {
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @InjectRepository(FavsEntity)
    private readonly favsRepository: Repository<FavsEntity>,
  ) {}

  async checkId(id: string) {
    const isValidId = validateId(id);

    if (!isValidId) {
      throw new HttpException(
        USER_MESSAGE.id_not_valid,
        HttpStatus.BAD_REQUEST,
      );
    }
    return;
  }

  async getFavsId(): Promise<string> {
    const allFavs = await this.favsRepository.find();

    if (allFavs.length !== 0) {
      return allFavs[0].id;
    }

    const createdFavs = this.favsRepository.create({
      artists: [] as Array<string>,
      albums: [] as Array<string>,
      tracks: [] as Array<string>,
    });

    return (await this.favsRepository.save(createdFavs)).id;
  }

  async getCurrentFavs() {
    const idFavs = await this.getFavsId();
    const allFavs = await this.favsRepository.findOne({
      where: { id: idFavs },
    });
    return { allFavs, idFavs };
  }

  async getAllFavs() {
    const { allFavs } = await this.getCurrentFavs();
    const tracks: TrackEntity[] = [];
    for (const trackId of allFavs.tracks) {
      try {
        const currTrack = await this.trackService.getTrackById(trackId);
        tracks.push(currTrack);
      } catch {}
    }
    const albums: AlbumEntity[] = [];
    for (const albumId of allFavs.albums) {
      try {
        const currAlbum = await this.albumService.getAlbumById(albumId);
        albums.push(currAlbum);
      } catch {}
    }

    const artists: ArtistEntity[] = [];
    for (const artist of allFavs.artists) {
      try {
        const currArtist = await this.artistService.getArtistById(artist);
        artists.push(currArtist);
      } catch {}
    }

    return { artists, albums, tracks };
  }

  async addArtist(id: string) {
    await this.checkId(id);
    const artistData = await this.artistService.getArtistPure(id);

    if (!artistData) {
      throw new HttpException(
        ARTIST_MESSAGE.not_found,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { allFavs, idFavs } = await this.getCurrentFavs();

    if (!allFavs.artists.find((artistId) => artistId === artistData.id)) {
      allFavs.artists.push(artistData.id);
      await this.favsRepository.update(idFavs, allFavs);
    }
  }

  async deleteArtist(id: string) {
    await this.checkId(id);
    const { allFavs, idFavs } = await this.getCurrentFavs();
    const indexArtist = allFavs.artists.findIndex(
      (artistId) => artistId === id,
    );

    if (indexArtist === -1) {
      throw new HttpException('Artist is not favorite', HttpStatus.NOT_FOUND);
    }

    allFavs.artists.splice(indexArtist, 1);
    await this.favsRepository.update(idFavs, allFavs);
  }

  async addTrack(id: string) {
    await this.checkId(id);
    const trackData = await this.trackService.getTrackPure(id);

    if (!trackData) {
      throw new HttpException(
        TRACK_MESSAGE.not_found,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const { allFavs, idFavs } = await this.getCurrentFavs();

    if (!allFavs.tracks.find((trackId) => trackId === trackData.id)) {
      allFavs.tracks.push(trackData.id);
      await this.favsRepository.update(idFavs, allFavs);
    }
  }

  async deleteTrack(id: string) {
    await this.checkId(id);
    const { allFavs, idFavs } = await this.getCurrentFavs();
    const indexTrack = allFavs.tracks.findIndex((trackId) => trackId === id);

    if (indexTrack === -1) {
      throw new HttpException('Album is not favorite', HttpStatus.NOT_FOUND);
    }

    allFavs.tracks.splice(indexTrack, 1);
    await this.favsRepository.update(idFavs, allFavs);
  }

  async addAlbum(id: string) {
    await this.checkId(id);
    const albumData = await this.albumService.getAlbumPure(id);

    if (!albumData) {
      throw new HttpException(
        ALBUM_MESSAGE.not_found,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const { allFavs, idFavs } = await this.getCurrentFavs();
    if (!allFavs.albums.find((albumId) => albumId === albumData.id)) {
      allFavs.albums.push(albumData.id);
      await this.favsRepository.update(idFavs, allFavs);
    }
  }

  async deleteAlbum(id: string) {
    await this.checkId(id);
    const { allFavs, idFavs } = await this.getCurrentFavs();
    const indexAlbum = allFavs.albums.findIndex((albumId) => albumId === id);

    if (indexAlbum === -1) {
      throw new HttpException('Album is not favorite', HttpStatus.NOT_FOUND);
    }

    allFavs.albums.splice(indexAlbum, 1);
    await this.favsRepository.update(idFavs, allFavs);
  }
}
