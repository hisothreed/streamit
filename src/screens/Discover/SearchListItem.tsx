import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import {ISearchable} from 'types/ISearchable';

interface Props {
  item: ISearchable;
  onPress: {(item: any): void};
}

function SearchListItem(props: Props) {
  const onPress = () => {
    props.onPress(props.item);
  };
  // TODO: actually highlight the matching characters using the 'matches' from fuse
  // since it gives exactly the index of the matched substring :)
  return (
    <Animated.View
      entering={FadeInDown}
      layout={Layout.easing(Easing.ease)}
      exiting={FadeOutDown}>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.label}>
          {props.item.value}{' '}
          <Text style={styles.sublabel}>in {props.item.hrt}</Text>
        </Text>
      </Pressable>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  button: {paddingHorizontal: 16, minHeight: 50},
  label: {color: 'white', fontWeight: '600', fontSize: 16},
  sublabel: {color: 'gray'},
});
export default SearchListItem;
