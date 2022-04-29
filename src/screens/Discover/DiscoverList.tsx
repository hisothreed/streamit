import React, {useCallback} from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {IVideo} from 'types/IVideo';
import DiscoverListItem from './DiscoverListItem';
import DiscoverListPlaceholder from './DiscoverListPlaceholder';

const AnimatedList =
  Animated.createAnimatedComponent<FlatListProps<IVideo>>(FlatList);

interface Props {
  scrollEventHandler:
    | ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    | Animated.Node<
        ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | undefined
      >
    | undefined;
  videos: Array<IVideo>;
  contentContainerStyle:
    | StyleProp<ViewStyle>
    | Animated.Node<StyleProp<ViewStyle>>;
  renderListHeader: JSX.Element;
  isLoading: boolean;
}

function DiscoverList(props: Props) {
  const renderItem: ListRenderItem<IVideo> = ({item}) => (
    <DiscoverListItem
      title={item.title}
      artist={item.artist}
      releaseYear={item.release_year}
      imageUrl={item.image_url}
      genre={item.genre?.name}
    />
  );
  const keyExtractor = useCallback(item => item.id.toString(), []);
  return (
    <AnimatedList
      numColumns={2}
      scrollEventThrottle={1}
      onScroll={props.scrollEventHandler}
      ListHeaderComponent={props.renderListHeader}
      data={props.videos}
      ListEmptyComponent={
        <DiscoverListPlaceholder isLoading={props.isLoading} />
      }
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={props.contentContainerStyle}
      columnWrapperStyle={styles.wrapper}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
});

export default DiscoverList;
