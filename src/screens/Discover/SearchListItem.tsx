import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';

interface Props {
  value: string;
  type: string;
  onPress: {(item: any): void};
}

function SearchListItem(props: Props) {
  const onPress = () => {
    props.onPress({value: props.value, type: props.type});
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
          {props.value} <Text style={styles.sublabel}>in {props.hrt}</Text>
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
