import React from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DiscoverGenrePickerItem from './DiscoverGenrePickerItem';
import {IGenre} from 'types/IGenre';

interface Props {
  genres: Array<IGenre>;
  onPressGenre: {(id: IGenre['id']): void};
}

function DiscoverListHeader(props: Props) {
  const renderItem: ListRenderItem<IGenre> = ({item}) => (
    <DiscoverGenrePickerItem onPress={props.onPressGenre} {...item} />
  );
  const keyExtractor = (item: IGenre) => item.id.toString();
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Pressable style={styles.button}>
          <Icon name={'ios-calendar-outline'} color={'red'} size={16} />
        </Pressable>
      </View>
      <FlatList<IGenre>
        horizontal
        data={props.genres}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingLeft: 16,
  },
  contentContainerStyle: {
    paddingRight: 16,
    paddingLeft: 5,
  },
  button: {
    borderRadius: 100,
    paddingHorizontal: 15,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    backgroundColor: '#1c1c1c',
    flexDirection: 'row',
  },
  calendarContainer: {
    paddingRight: 5,
  },
});

export default DiscoverListHeader;
