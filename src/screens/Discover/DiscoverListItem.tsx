import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  Easing,
  FadeInUp,
  FadeOutUp,
  Layout,
} from 'react-native-reanimated';

interface Props {
  title: string;
  artist: string;
  releaseYear: number;
  imageUrl: string;
  genre: string;
}

function DiscoverListItem(props: Props) {
  console.log(props.genre);

  return (
    <Animated.View
      entering={FadeInUp}
      layout={Layout.easing(Easing.ease)}
      exiting={FadeOutUp}
      style={styles.container}>
      <FastImage source={{uri: props.imageUrl}} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>
        {props.title}
      </Text>
      <Text numberOfLines={1} style={styles.artist}>
        {props.artist}
      </Text>
      <Text style={styles.year}>
        {props.releaseYear}
        {!!props.genre && <Text>- {props.genre}</Text>}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
  },
  image: {height: 200, width: '100%', borderRadius: 5},
  year: {
    fontSize: 10,
    fontWeight: '400',
    color: 'gray',
    marginTop: 5,
  },
  artist: {
    fontSize: 12,
    fontWeight: '500',
    color: 'gray',
    marginTop: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
  },
});

export default memo(DiscoverListItem);
