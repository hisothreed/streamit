import {IGenre} from 'types/IGenre';
import {IVideo} from 'types/IVideo';

const fetchFeed = async (): Promise<{
  genres: Array<IGenre>;
  videos: Array<IVideo>;
}> =>
  await fetch(
    'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json',
  ).then(res => res.json());

export {fetchFeed};
