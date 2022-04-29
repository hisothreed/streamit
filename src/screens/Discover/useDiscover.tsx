import {useMemo, useState} from 'react';
import {useQuery} from 'react-query';
import {IGenre} from 'types/IGenre';
import {IVideo} from 'types/IVideo';

const fetchStuff = async (): Promise<{
  genres: Array<IGenre>;
  videos: Array<IVideo>;
}> =>
  await fetch(
    'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json',
  ).then(res => res.json());

const typeValueMap = {
  video: 'title',
  artist: 'artist',
  genre: 'name',
};

export const useDiscover = () => {
  const [{selectedGenres, searchable}, setFilters] = useState({
    selectedGenres: [],
    searchable: null,
  });
  const {data, isLoading} = useQuery('data', fetchStuff, {
    select: ({genres, videos}) => {
      return {
        genres: {
          map: genres.reduce((acc, curr) => ({
            ...acc,
            [curr.id]: curr,
          })),
          array: [{id: 0, name: 'All', isActive: true}, ...genres],
        },
        videos,
      };
    },
  });
  const setSearchable = searchable => {
    setFilters(f => ({...f, searchable}));
  };
  const toggleGenre = genreId => {
    if (genreId === 0) {
      return setFilters(f => ({
        ...f,
        selectedGenres: [],
      }));
    }
    setFilters(f => ({
      ...f,
      selectedGenres: f.selectedGenres.includes(genreId)
        ? f.selectedGenres.filter(id => id !== genreId)
        : [...f.selectedGenres, genreId],
    }));
  };

  const filteredList = useMemo(() => {
    let results = [...(data?.videos || [])];
    if (searchable) {
      results = results.filter(
        item => item[typeValueMap[searchable.type]] === searchable.value,
      );
    }
    if (!!selectedGenres.length) {
      results = results.filter(item =>
        selectedGenres.some(genre => genre === item.genre_id),
      );
    }
    return results;
  }, [selectedGenres, searchable]);

  return {
    data,
    isLoading,
    selectedGenres,
    searchable,
    toggleGenre,
    setSearchable,
    filteredList,
  };
};
