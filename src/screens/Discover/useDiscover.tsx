import {useMemo, useState} from 'react';
import {useQuery} from 'react-query';
import {IGenre} from 'types/IGenre';
import {IVideo} from 'types/IVideo';

// Actually won't be here also, this must be placed in a separate folder (i prefere under lib/api/)
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
  const [{selectedGenres, searchable, year}, setFilters] = useState<{
    selectedGenres: Array<Number>;
    searchable: any;
    year: string | null;
  }>({
    selectedGenres: [],
    searchable: null,
    year: null,
  });
  const {data, isLoading} = useQuery('data', fetchStuff, {
    select: ({videos, genres}) => {
      const genresMap = genres.reduce((acc, curr) => ({
        ...acc,
        [curr.id]: curr,
      }));

      return {
        videos: videos.map(video => ({
          ...video,
          genre: genresMap[video.genre_id] || 'N/A',
        })),
        genres,
      };
    },
  });

  const setSearchable = (value: any) => {
    setFilters(f => ({...f, searchable: value}));
  };
  const toggleGenre = (genreId: number, forceAdd?: boolean) => {
    if (genreId === 0) {
      return setFilters(f => ({
        ...f,
        selectedGenres: [],
      }));
    }
    if (forceAdd) {
      // or we can use "Set"
      return setFilters(f => ({
        ...f,
        selectedGenres: f.selectedGenres.includes(genreId)
          ? f.selectedGenres
          : [...f.selectedGenres, genreId],
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
    if (year) {
      results = results.filter(item => +item.release_year === +year);
    }
    if (selectedGenres.length) {
      results = results.filter(item =>
        selectedGenres.some(genre => genre === item.genre_id),
      );
    }
    return results;
  }, [selectedGenres, searchable, data?.videos, year]);
  const genres = [
    {id: 0, name: 'All Genres', isActive: selectedGenres.length === 0},
    ...(data?.genres || []),
  ];
  const setYear = year => {
    setFilters(filters => ({
      ...filters,
      year,
    }));
  };
  return {
    genres,
    videos: data?.videos,
    isLoading,
    selectedGenres,
    searchable,
    filteredList,
    year,
    toggleGenre,
    setSearchable,
    setYear,
  };
};
