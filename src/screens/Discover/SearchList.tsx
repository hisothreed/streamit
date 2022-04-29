/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import SearchListItem from './SearchListItem';
import {useKeyboard} from './useKyeboard';
import Fuse from 'fuse.js';
import SearchListPlaceholder from './SearchListPlacholder';
import {IGenre} from 'types/IGenre';
import {IVideo} from 'types/IVideo';

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
const isPropValuesEqual = (subject, target, propNames) =>
  propNames.every(propName => subject[propName] === target[propName]);

const getUniqueItemsByProperties = (items, propNames) =>
  items.filter(
    (item, index, array) =>
      index ===
      array.findIndex(foundItem =>
        isPropValuesEqual(foundItem, item, propNames),
      ),
  );
function SearchList(props: Props) {
  const renderItem = ({item}) => (
    <SearchListItem onPress={props.handleSearch} item={item} />
  );
  const fuse = useMemo(() => {
    return new Fuse(
      [
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
      ],
      options,
    );
  }, [props.genres, props.videos]);
  const data = getUniqueItemsByProperties(
    fuse?.search?.(props.query).map(e => e.item) || [],
    ['value', 'type'],
  );
  const {keyboardHeight, keyboardShown} = useKeyboard();
  const keyExtractor = item => `${item.id}-${item.type}`;
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
        contentContainerStyle={{
          paddingBottom: keyboardShown ? keyboardHeight : 0,
        }}
        ListEmptyComponent={
          <SearchListPlaceholder
            keyboardHeight={keyboardShown ? keyboardHeight : 0}
          />
        }
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
