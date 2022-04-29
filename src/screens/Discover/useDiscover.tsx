import {useQuery} from 'react-query';

const fetchStuff = async (): Promise<{
  genres: Array<{id; name}>;
  videos: Array<{
    id;
    artist;
    title;
    release_year;
    genre_id;
    image_url;
  }>;
}> =>
  await fetch(
    'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json',
  ).then(res => res.json());

export const useDiscover = () => {
  const {data, isLoading} = useQuery('data', fetchStuff, {
    select: ({genres, videos}) => {
      return {
        genres: {
          map: genres.reduce((acc, curr) => ({
            ...acc,
            [curr.id]: curr,
          })),
          array: genres,
        },
        videos,
      };
    },
  });
  return {data, isLoading};
};
