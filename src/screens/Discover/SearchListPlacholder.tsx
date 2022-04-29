import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
interface Props {
  keyboardHeight?: number;
}

function SearchListPlaceholder(props: Props) {
  if (!props.keyboardHeight) {
    return null;
  }
  return (
    <Animated.View
      entering={FadeInDown}
      layout={Layout.easing(Easing.ease)}
      exiting={FadeOutDown}
      style={[styles.placeholder, {paddingBottom: props.keyboardHeight}]}>
      <Icon name={'search'} color={'gray'} size={90} />
      <Text style={styles.placeholderText}>
        Search for your favorite artists, tracks, albums, videos and playlists
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  placeholderText: {
    color: 'gray',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    height: Dimensions.get('screen').height,
  },
});

export default SearchListPlaceholder;
