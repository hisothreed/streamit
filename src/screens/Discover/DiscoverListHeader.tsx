import React, {useCallback} from 'react';
import {
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DiscoverGenrePickerItem from './DiscoverGenrePickerItem';
import {IGenre} from 'types/IGenre';

interface Props {
  genres: Array<IGenre>;
  year: string | null;
  onPressGenre: {(id: IGenre['id']): void};
  onPressCalendar: {(): void};
}

function DiscoverListHeader(props: Props) {
  const renderItem: ListRenderItem<IGenre> = ({item}) => (
    <DiscoverGenrePickerItem onPress={props.onPressGenre} {...item} />
  );
  const keyExtractor = useCallback((item: IGenre) => item.id.toString(), []);
  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <TouchableOpacity onPress={props.onPressCalendar} style={styles.button}>
          <Icon name={'chevron-down-sharp'} color={'white'} size={16} />
          <Text style={styles.year}>{props.year || 'All Years'}</Text>
        </TouchableOpacity>
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
    borderRadius: 5,
    minWidth: 100,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  calendarContainer: {
    paddingRight: 5,
  },
  year: {color: 'white', marginHorizontal: 5, fontWeight: '600'},
});

export default DiscoverListHeader;
