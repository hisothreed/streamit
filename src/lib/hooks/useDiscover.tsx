import {fetchFeed} from 'lib/api';
import {useCallback, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {ISearchable} from 'types/ISearchable';
import {IVideo} from 'types/IVideo';

const typeValueMap = {
  video: 'title',
  artist: 'artist',
  genre: 'name',
};

type DiscoverStateType = {
  selectedGenres: Array<Number>;
  searchable: ISearchable | null;
  year: string | null;
};

export const useDiscover = () => {
  const [{selectedGenres, searchable, year}, setFilters] =
    useState<DiscoverStateType>({
      selectedGenres: [],
      searchable: null,
      year: null,
    });

  const select = useCallback(({videos, genres}) => {
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
  }, []);

  const {data, isLoading} = useQuery('data', fetchFeed, {
    select,
  });

  const setSearchable = (value: any) => {
    setFilters(f => ({...f, searchable: value}));
  };
  const toggleGenre = (genreId: number, forceAdd?: boolean) => {
    // user clicked on "All Genres"
    if (genreId === 0) {
      return setFilters(f => ({
        ...f,
        // reset to default.
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

  const setYear = (value: string | null) => {
    setFilters(filters => ({
      ...filters,
      year: value,
    }));
  };
  const [filteredList, setFilteredList] = useState<Array<IVideo>>([]);

  const prepareFilteredList = useCallback(() => {
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
    setFilteredList(results);
  }, [searchable, year, selectedGenres, data?.videos]);

  useEffect(() => {
    prepareFilteredList();
  }, [selectedGenres, searchable, data?.videos, year, prepareFilteredList]);

  const genres = [
    {id: 0, name: 'All Genres', isActive: selectedGenres.length === 0},
    ...(data?.genres?.map?.(a => ({
      ...a,
      isActive: a.isActive || selectedGenres.includes(a.id),
    })) || []),
  ];
  return {
    genres,
    videos: data?.videos,
    isLoading,
    searchable,
    filteredList,
    year,
    toggleGenre,
    setSearchable,
    setYear,
  };
};
