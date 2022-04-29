/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import SearchListItem from './SearchListItem';
import Fuse from 'fuse.js';
import SearchListPlaceholder from './SearchListPlacholder';
import {IGenre} from 'types/IGenre';
import {IVideo} from 'types/IVideo';
import {getUniqueItemsByProperties} from 'lib/helpers';
import {useKeyboard} from 'lib/hooks';
import {ISearchable} from 'types/ISearchable';

const options = {
  isCaseSensitive: false,
  includeScore: false,
  shouldSort: true,
  includeMatches: true,
  findAllMatches: false,
  minMatchCharLength: 2,
  location: 0,
  distance: 10,
  threshold: 0.3,
  keys: ['value'],
};

interface Props {
  genres: Array<IGenre>;
  videos: Array<IVideo>;
  topInset: number;
  query: string;
  handleSearch: {(searchable: any): void};
}
// wouldn't put that here ofcourse, just now to get it done asap
function SearchList(props: Props) {
  const {keyboardHeight, keyboardShown} = useKeyboard();
  const prepareDocs = (): Array<ISearchable> => [
    ...props.genres.map(g => ({
      id: g.id,
      value: g.name,
      type: 'genre',
      hrt: 'Genres',
    })),
    ...props.videos.map(v => ({
      id: v.id,
      value: v.artist,
      type: 'artist',
      hrt: 'Artists',
    })),
    ...props.videos.map(v => ({
      id: v.id,
      value: v.title,
      type: 'video',
      hrt: 'Videos',
    })),
  ];
  const fuse = useRef(new Fuse(prepareDocs(), options)).current;
  useEffect(() => {
    fuse.setCollection(prepareDocs());
  }, [props.genres, props.videos]);
  // so if we have results for x in two types of results, only one will be picked
  const data = getUniqueItemsByProperties(
    fuse?.search?.(props.query).map(e => e.item) || [],
    ['value', 'type'],
  );
  const renderItem = ({item}) => (
    <SearchListItem onPress={props.handleSearch} item={item} />
  );
  const keyExtractor = item => `${item.id}-${item.type}`;
  const contentContainerStyle = {
    paddingBottom: keyboardShown ? keyboardHeight : 0,
  };
  return (
    <Animated.View
      entering={FadeInDown}
      layout={Layout.easing(Easing.ease)}
      exiting={FadeOutDown}
      style={[styles.container, {top: props.topInset}]}>
      <FlatList
        scrollEventThrottle={1}
        keyboardShouldPersistTaps={'handled'}
        data={data}
        keyExtractor={keyExtractor}
        contentContainerStyle={contentContainerStyle}
        ListEmptyComponent={SearchListPlaceholder}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'black',
    zIndex: 10,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SearchList;
