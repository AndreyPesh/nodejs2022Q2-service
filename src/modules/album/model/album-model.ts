import { createAlbum } from 'src/utils/albums';
import { CreateAlbumDto } from '../dto/create-album-dto';
import { Album } from '../interfaces/album-interface';

const albums: Array<Album> = [];

export class AlbumModel {
  async getAllAlbums() {
    return albums;
  }

  async getAlbumById(id: string) {
    return albums.find((album) => album.id === id);
  }

  async addAlbum(albumData: CreateAlbumDto) {
    const newAlbum = createAlbum(albumData);
    albums.push(newAlbum);
    return newAlbum;
  }

  async updateAlbum(id: string, albumData: CreateAlbumDto) {
    const currentAlbum = await this.getAlbumById(id);
    Object.assign(currentAlbum, albumData);
    return currentAlbum;
  }

  async deleteAlbumById(id: string) {
    const indexAlbumDelete = albums.findIndex((artist) => artist.id === id);
    if (indexAlbumDelete === -1) {
      return false;
    }
    albums.splice(indexAlbumDelete, 1);
    return true;
  }
}
