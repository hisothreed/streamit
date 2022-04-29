/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Keyboard, StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDiscover} from './useDiscover';
import {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import DiscoverList from './DiscoverList';
import SearchList from './SearchList';
import DiscoverListHeader from './DiscoverListHeader';
import DiscoverHeader from './DiscoverHeader';

function Discover() {
  const {
    data,
    selectedGenres,
    toggleGenre,
    setSearchable,
    searchable,
    filteredList,
  } = useDiscover();
  const {top} = useSafeAreaInsets();
  const [titleHeight, setTitleHeight] = useState<number>(0);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const scrollY = useSharedValue(0);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'FOCUSED' | 'DISMISSING' | 'NONE'>(
    'NONE',
  );
  const scrollEventHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = -event.contentOffset.y;
    },
  });
  const scroll = useDerivedValue(() => {
    if (status === 'FOCUSED') {
      return withTiming(-(titleHeight + top), {duration: 300});
    }
    if (status === 'DISMISSING') {
      return withTiming(scrollY.value, {duration: 300});
    }
    return scrollY.value;
  }, [status]);
  const onBlur = () => {
    setStatus('DISMISSING');
    setTimeout(() => {
      setStatus('NONE');
    }, 500);
  };
  const onFocus = () => {
    setStatus('FOCUSED');
  };
  const onSearch = (selected: any) => {
    setSearchable(selected);
    Keyboard.dismiss();
    onBlur();
    setQuery(selected.value);
  };
  const inputValue =
    status === 'FOCUSED' || !searchable
      ? query
      : `${searchable.value} in ${searchable.type}`;
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar barStyle={'light-content'} />
      <DiscoverHeader
        onBlur={onBlur}
        onFocus={onFocus}
        inputValue={inputValue}
        setHeaderHeight={setHeaderHeight}
        setTitleHeight={setTitleHeight}
        headerHeight={headerHeight}
        titleHeight={titleHeight}
        scroll={scroll}
        onChange={setQuery}
      />
      {status === 'FOCUSED' && (
        <SearchList
          handleSearch={onSearch}
          query={query}
          topInset={headerHeight - titleHeight}
          genres={data?.genres?.array || []}
          videos={data?.videos || []}
        />
      )}
      <DiscoverList
        renderListHeader={
          <DiscoverListHeader
            onPressGenre={toggleGenre}
            genres={
              data?.genres?.array.map(a => ({
                ...a,
                isActive: a.isActive ?? selectedGenres.includes(a.id),
              })) || []
            }
          />
        }
        contentContainerStyle={{paddingTop: headerHeight}}
        scrollEventHandler={scrollEventHandler}
        videos={filteredList}
      />
    </View>
  );
}

export default Discover;
