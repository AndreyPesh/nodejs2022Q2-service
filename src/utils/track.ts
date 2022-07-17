import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from 'src/modules/track/dto/create-track-dto';

export function createTrack(trackData: CreateTrackDto) {
  const id = uuidv4();
  return Object.assign({ id }, trackData);
}

export function validateDataTrack(trackData: CreateTrackDto) {
  if (
    trackData.name === undefined ||
    trackData.duration === undefined ||
    !Number.isInteger(trackData.duration)
  ) {
    return false;
  }
  return true;
}
