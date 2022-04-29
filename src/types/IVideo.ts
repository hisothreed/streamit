import {IGenre} from './IGenre';

export interface IVideo {
  id: number;
  artist: string;
  title: string;
  release_year: number;
  genre_id: number;
  image_url: string;
  //
  genre: IGenre;
}
