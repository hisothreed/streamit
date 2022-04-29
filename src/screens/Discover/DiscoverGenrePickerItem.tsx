/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  name: string;
  isActive: boolean;
  onPress: {(id: number): void};
  id: number;
}

function DiscoverGenrePickerItem(props: Props) {
  const handlePress = () => {
    props.onPress(props.id);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={styles.button}>
      <View
        style={[
          styles.dot,
          {
            opacity: props.isActive ? 1 : 0,
          },
        ]}
      />
      <Text
        style={[
          styles.text,
          {
            color: props.isActive ? 'white' : 'gray',
          },
        ]}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    marginRight: 5,
    borderRadius: 100,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderColor: 'white',
    flexDirection: 'row',
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 5,
  },
  text: {
    fontWeight: '500',
  },
});

export default DiscoverGenrePickerItem;
