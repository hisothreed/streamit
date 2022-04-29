import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

function DiscoverListItem({title, artist, release_year, image_url}) {
  return (
    <View style={styles.container}>
      <FastImage
        source={{uri: image_url}}
        style={{height: 150, width: '100%', borderRadius: 5}}
      />
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: 'white',
          marginTop: 10,
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: 'gray',
          marginTop: 5,
        }}>
        {artist}
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontWeight: '400',
          color: 'gray',
          marginTop: 5,
        }}>
        {release_year}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
  },
});

export default DiscoverListItem;
