import { createTrack } from 'src/utils/track';
import { CreateTrackDto } from '../dto/create-track-dto';
import { Track } from '../interfaces/track-interface';

const tracks: Array<Track> = [];

export class TrackModel {
  async getAllTrack() {
    return tracks;
  }

  async getTrackById(id: string) {
    return tracks.find((track) => track.id === id);
  }

  async addTrack(trackData: CreateTrackDto) {
    const newTrack = createTrack(trackData);
    tracks.push(newTrack);
    return newTrack;
  }

  async updateTrack(id: string, trackData: CreateTrackDto) {
    const currentTrack = await this.getTrackById(id);
    Object.assign(currentTrack, trackData);
    return currentTrack;
  }

  async deleteTrackById(id: string) {
    const indexTrackDelete = tracks.findIndex((artist) => artist.id === id);
    if (indexTrackDelete === -1) {
      return false;
    }
    tracks.splice(indexTrackDelete, 1);
    return true;
  }
}
