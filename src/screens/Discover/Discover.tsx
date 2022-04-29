import React, {useRef, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDiscover} from 'lib/hooks/useDiscover';
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
import YearPicker, {YearPickerRef} from 'components/YearPicker';

type StatusType = 'FOCUSED' | 'DISMISSING' | 'NONE';

function Discover() {
  const yearPickerRef = useRef<YearPickerRef>(null);
  const {
    genres,
    videos,
    searchable,
    year,
    isLoading,
    filteredList,
    toggleGenre,
    setSearchable,
    setYear,
  } = useDiscover();
  const {top} = useSafeAreaInsets();
  const [titleHeight, setTitleHeight] = useState<number>(0);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const scrollY = useSharedValue(0);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusType>('NONE');
  const inputValue =
    status === 'FOCUSED' || !searchable
      ? query
      : `${searchable.value} in ${searchable.type}`;
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
  const onFocus = () => {
    setStatus('FOCUSED');
  };
  const onSearch = (selected: any) => {
    handleDismiss();
    if (selected.type === 'genre') {
      toggleGenre(selected.id, true);
      setQuery('');
    } else {
      setSearchable(selected);
      setQuery(selected.value);
    }
  };

  const onPressCalendar = () => {
    yearPickerRef.current?.present?.();
  };
  const onCancel = () => {
    setSearchable(null);
    setQuery('');
    handleDismiss();
  };
  const handleDismiss = () => {
    Keyboard.dismiss();
    setStatus('DISMISSING');
    setTimeout(() => {
      setStatus('NONE');
    }, 500);
  };
  return (
    <>
      <View style={styles.container}>
        <DiscoverHeader
          onDismiss={onCancel}
          onFocus={onFocus}
          inputValue={inputValue}
          setHeaderHeight={setHeaderHeight}
          setTitleHeight={setTitleHeight}
          headerHeight={headerHeight}
          titleHeight={titleHeight}
          scroll={scroll}
          onChange={setQuery}
          isEditing={status === 'FOCUSED'}
        />
        {status === 'FOCUSED' && (
          <SearchList
            handleSearch={onSearch}
            query={query}
            topInset={headerHeight - top}
            genres={genres || []}
            videos={videos || []}
          />
        )}
        <DiscoverList
          isLoading={isLoading}
          renderListHeader={
            <DiscoverListHeader
              onPressCalendar={onPressCalendar}
              onPressGenre={toggleGenre}
              year={year}
              genres={genres}
            />
          }
          contentContainerStyle={{paddingTop: headerHeight}}
          scrollEventHandler={scrollEventHandler}
          videos={filteredList}
        />
      </View>
      {/* wouldn't actually use it this way, it's not performant and not clean enough, instead, it would be presented as a transparent/over-context modal (navigation) */}
      <YearPicker onSubmit={setYear} ref={yearPickerRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},
});

export default Discover;
