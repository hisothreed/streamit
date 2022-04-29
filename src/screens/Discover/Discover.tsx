/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
  LayoutChangeEvent,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDiscover} from './useDiscover';
import FastImage from 'react-native-fast-image';

function Discover() {
  const {data} = useDiscover();
  const {top} = useSafeAreaInsets();
  const [title, setTitle] = useState<number>(0);
  const [header, setHeader] = useState<number>(0);
  const handleTitleLayout = (e: LayoutChangeEvent) => {
    setTitle(e.nativeEvent.layout.height);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar barStyle={'light-content'} />
      {/* HEADER */}
      <View
        onLayout={e => {
          setHeader(e.nativeEvent.layout.height);
        }}
        style={{
          top: 0,
          zIndex: 10,
          backgroundColor: 'black',
          width: '100%',
          position: 'absolute',
          paddingTop: top + 30,
          paddingBottom: 15,
          flexDirection: 'column',
        }}>
        <View
          onLayout={handleTitleLayout}
          style={{
            paddingHorizontal: 16,
          }}>
          <Text style={{fontSize: 36, fontWeight: '700', color: 'white'}}>
            Discover
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 15,
          }}>
          <Icon name={'search'} size={20} />
          <TextInput
            placeholder={'Search'}
            style={{height: 45, paddingLeft: 10, flex: 1, fontWeight: '500'}}
            clearButtonMode={'unless-editing'}
            placeholderTextColor={'gray'}
          />
        </View>
      </View>
      {/* ==== HEADER ==== */}

      <FlatList<typeof data.videos[0]>
        numColumns={2}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              paddingBottom: 20,
              paddingLeft: 16,
            }}>
            <View
              style={{
                paddingRight: 5,
              }}>
              <Pressable
                style={{
                  borderRadius: 100,
                  paddingHorizontal: 15,
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: 'white',
                  backgroundColor: '#1c1c1c',
                  flexDirection: 'row',
                }}>
                <Icon name={'ios-calendar-outline'} color={'red'} size={16} />
              </Pressable>
            </View>
            <FlatList
              horizontal
              data={data?.genres?.array || []}
              stickyHeaderIndices={[0]}
              contentContainerStyle={{
                paddingRight: 16,
                paddingLeft: 5,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <Pressable
                  style={{
                    marginRight: 5,
                    borderRadius: 100,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    borderColor: 'white',
                    backgroundColor: '#1c1c1c',
                  }}>
                  <Text style={{color: 'white', fontWeight: '500'}}>
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        }
        data={data?.videos || []}
        contentContainerStyle={{
          paddingTop: header,
        }}
        columnWrapperStyle={{
          paddingHorizontal: 16,
          paddingBottom: 10,
        }}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              margin: 5,
              borderRadius: 5,
            }}>
            <FastImage
              source={{uri: item.image_url}}
              style={{height: 150, width: '100%', borderRadius: 5}}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: 'white',
                marginTop: 10,
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: 'gray',
                marginTop: 5,
              }}>
              {item.artist}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '400',
                color: 'gray',
                marginTop: 5,
              }}>
              {item.release_year}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

export default Discover;
