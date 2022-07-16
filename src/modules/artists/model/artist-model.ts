import { CreateArtistDto } from '../dto/artist-create-dto';
import { Artist } from '../interfaces/artist-interface';
import { createArtist } from '../../../utils/artists';

const artists: Array<Artist> = [];

export class ArtistModel {
  async getAllArtists() {
    return artists;
  }

  async getArtistById(id: string) {
    return artists.find((artist) => artist.id === id);
  }

  async addArtist(artistData: CreateArtistDto) {
    const newArtist = createArtist(artistData);
    artists.push(newArtist);
    return newArtist;
  }

  async updateArtist(id: string, artistData: CreateArtistDto) {
    const currentArtist = await this.getArtistById(id);
    Object.assign(currentArtist, artistData)
    return currentArtist;
  }

  async deleteArtistById(id: string) {
    const indexArtistDelete = artists.findIndex((artist) => artist.id === id);
    if (indexArtistDelete === -1) {
      return false;
    }
    artists.splice(indexArtistDelete, 1);
    return true;
  }
}

