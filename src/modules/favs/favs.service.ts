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
import { ArtistsService } from '../artists/artists.service';
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
      artists: [],
      albums: [],
      tracks: [],
    });

    return (await this.favsRepository.save(createdFavs)).id;
  }

  async getAllFavs() {
    const id = await this.getFavsId();
    const allFavs = await this.favsRepository.findOne({
      where: { id },
    });
    const tracks = [];
    for (const trackId of allFavs.tracks) {
      try {
        const currTrack = await this.trackService.getTrackById(trackId);
        tracks.push(currTrack);
      } catch {}
    }
    const albums = [];
    for (const albumId of allFavs.albums) {
      try {
        const currAlbum = await this.albumService.getAlbumById(albumId);
        albums.push(currAlbum);
      } catch {}
    }

    const artists = [];
    for (const artistId of allFavs.artists) {
      try {
        const curraArtist = await this.artistService.getArtistById(artistId);
        artists.push(curraArtist);
      } catch {}
    }

    return { artists, albums, tracks };
    // const { artists, albums, tracks } = allFavs;
    // return { artists, albums, tracks };
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
    const favsId = await this.getFavsId();
    const favs = await this.favsRepository.findOne({
      where: { id: favsId },
    });
    favs.artists.push(artistData.id);
    const data =  this.favsRepository.create(favs);
    await this.favsRepository.save(data);
    // return artistData;
  }

  async deleteArtist(id: string) {
    await this.checkId(id);
    const favsId = await this.getFavsId();
    const favs = await this.favsRepository.findOne({
      where: { id: favsId },
    });
    const indexArtist = favs.artists.findIndex((artistId) => artistId === id);

    if (indexArtist === -1) {
      throw new HttpException('Artist is not favorite', HttpStatus.NOT_FOUND);
    }

    favs.artists.splice(indexArtist, 1);
    await this.favsRepository.save(favs);
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
    // const favs = await this.getAllFavs();
    const favsId = await this.getFavsId();
    const favs = await this.favsRepository.findOne({
      where: { id: favsId },
    });
    favs.tracks.push(trackData.id);
    const data = this.favsRepository.create(favs);
    await this.favsRepository.save(data);
  }

  async deleteTrack(id: string) {
    await this.checkId(id);
    const favsId = await this.getFavsId();
    const favs = await this.favsRepository.findOne({
      where: { id: favsId },
    });
    const indexTrack = favs.tracks.findIndex((trackId) => trackId === id);

    if (indexTrack === -1) {
      throw new HttpException('Album is not favorite', HttpStatus.NOT_FOUND);
    }

    favs.tracks.splice(indexTrack, 1);
    await this.favsRepository.save(favs);
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
    const favsId = await this.getFavsId();
    const favs = await this.favsRepository.findOne({
      where: { id: favsId },
    });
    favs.albums.push(albumData.id);
    const data = this.favsRepository.create(favs);
    await this.favsRepository.save(data);
  }

  async deleteAlbum(id: string) {
    await this.checkId(id);
    const favsId = await this.getFavsId();
    const favs = await this.favsRepository.findOne({
      where: { id: favsId },
    });
    const indexAlbum = favs.albums.findIndex((albumId) => albumId === id);

    if (indexAlbum === -1) {
      throw new HttpException('Album is not favorite', HttpStatus.NOT_FOUND);
    }

    favs.albums.splice(indexAlbum, 1);
    await this.favsRepository.save(favs);
  }
}
