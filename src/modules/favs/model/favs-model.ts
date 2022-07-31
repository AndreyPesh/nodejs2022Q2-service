// import { Artist } from 'src/modules/artists/entities/artist.entity';
// import { Track } from 'src/modules/track/interfaces/track-interface';

// const artists: Array<Artist> = [];
// // const albums: Array<Album> = [];
// const tracks: Array<Track> = [];

// export class FavsModel {
//   async getAllFavs() {
//     return { artists, tracks };
//   }

//   async addTrack(trackData: Track) {
//     const trackIsExist = tracks.find((track) => track.id === trackData.id);
//     if (!trackIsExist) {
//       tracks.push(trackData);
//     }
//   }

//   async deleteTrack(id: string) {
//     const indexTrack = tracks.findIndex((track) => track.id === id);
//     if (indexTrack === -1) {
//       return false;
//     }

//     tracks.splice(indexTrack, 1);

//     return true;
//   }

//   async addArtist(artistData: Artist) {
//     const artistIsExist = artists.find((artist) => artist.id === artistData.id);
//     if (!artistIsExist) {
//       artists.push(artistData);
//     }
//   }

//   async deleteArtist(id: string) {
//     const indexArtist = artists.findIndex((artist) => artist.id === id);
//     if (indexArtist === -1) {
//       return false;
//     }

//     artists.splice(indexArtist, 1);

//     return true;
//   }

//   // async addAlbum(albumData: Album) {
//   //   const albumIsExist = albums.find((album) => album.id === albumData.id);
//   //   if (!albumIsExist) {
//   //     albums.push(albumData);
//   //   }
//   // }

//   async deleteAlbum(id: string) {
//     // const indexAlbum = albums.findIndex((album) => album.id === id);
//     // if (indexAlbum === -1) {
//     //   return false;
//     // }

//     // albums.splice(indexAlbum, 1);
//     // return true;
//   }
// }
