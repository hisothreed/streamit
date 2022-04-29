import React from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  isLoading: boolean;
}

function DiscoverListPlaceholder(props: Props) {
  return (
    <Animated.View
      entering={FadeInDown}
      layout={Layout.easing(Easing.ease)}
      exiting={FadeOutDown}
      style={styles.placeholder}>
      {props.isLoading ? (
        <ActivityIndicator size={'large'} color={'white'} animating />
      ) : (
        <>
          <Icon name={'sad-outline'} color={'gray'} size={90} />
          <Text style={styles.placeholderText}>
            We couldn't find any results matching your preferences try to change
            something :/
          </Text>
        </>
      )}
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
    marginTop: 100,
  },
});

export default DiscoverListPlaceholder;
