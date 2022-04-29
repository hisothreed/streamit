import React from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  setHeaderHeight: {(height: number): void};
  setTitleHeight: {(height: number): void};

  headerHeight: number;
  titleHeight: number;

  scroll: SharedValue<number>;
  inputValue: string;
  onFocus: {(): void};
  onBlur: {(): void};
  onChange: {(value: string): void};
}

function DiscoverHeader(props: Props) {
  const onLayout = (e: LayoutChangeEvent) => {
    props.setHeaderHeight(e.nativeEvent.layout.height);
  };
  const onTitleLayout = (e: LayoutChangeEvent) => {
    props.setTitleHeight(e.nativeEvent.layout.height);
  };
  const {top} = useSafeAreaInsets();
  const titleStyle = useAnimatedStyle(() => {
    if (!props.titleHeight) {
      return {};
    }
    return {
      opacity: interpolate(
        props.scroll.value,
        [0, -(props.titleHeight + 30)],
        [1, 0],
        Extrapolate.CLAMP,
      ),
    };
  });
  const headerStyle = useAnimatedStyle(() => {
    if (!props.headerHeight) {
      return {};
    }
    return {
      transform: [
        {
          translateY: interpolate(
            props.scroll.value,
            [0, -(props.titleHeight + 30)],
            [0, -(props.titleHeight + 30)],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        headerStyle,
        {
          paddingTop: top + 30,
        },
        styles.container,
      ]}>
      <Animated.View
        onLayout={onTitleLayout}
        style={[titleStyle, styles.titleContainer]}>
        <Text style={styles.title}>Discover</Text>
      </Animated.View>
      <View style={styles.inputContainer}>
        <Icon name={'search'} size={20} />
        <TextInput
          onChangeText={props.onChange}
          value={props.inputValue}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          placeholder={'Search for artists, genres, videos..'}
          style={styles.input}
          clearButtonMode={'unless-editing'}
          placeholderTextColor={'gray'}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    zIndex: 11,
    backgroundColor: 'black',
    width: '100%',
    position: 'absolute',
    paddingBottom: 15,
    flexDirection: 'column',
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 15,
  },
  title: {fontSize: 36, fontWeight: '700', color: 'white'},
  input: {height: 45, paddingLeft: 10, flex: 1, fontWeight: '500'},
});

export default DiscoverHeader;
