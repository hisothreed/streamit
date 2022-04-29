import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useMemo,
  useRef,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WheelPicker from 'react-native-wheely';

// Must be in a separate file.
const Backdrop = props => (
  <BottomSheetBackdrop
    {...props}
    opacity={0.8}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
  />
);

// Must be in a separate file.
function generateArrayOfYears() {
  var max = new Date().getFullYear();
  var min = 1910;
  var years: Array<string> = [];

  for (var i = max; i >= min; i--) {
    years.push(i.toString());
  }
  return years;
}

export interface YearPickerRef {
  present: {(): void};
}

interface Props {
  onSubmit: {(year: string | null): void};
}

const YearPicker = forwardRef<YearPickerRef, Props>((props, ref) => {
  const sheetRef = useRef<BottomSheet>(null);
  const years = useMemo(() => ['All', ...generateArrayOfYears()], []);
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
  useImperativeHandle(ref, () => ({
    present: () => {
      sheetRef.current?.expand();
    },
  }));
  // callbacks
  const dismiss = () => {
    sheetRef.current?.close();
  };
  const [index, setIndex] = useState(0);
  const {bottom} = useSafeAreaInsets();
  const submit = () => {
    dismiss();
    if (index === 0) {
      return props.onSubmit(null);
    }
    props.onSubmit(years[index]);
  };
  return (
    <BottomSheet
      ref={sheetRef}
      enablePanDownToClose
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      index={-1}
      backdropComponent={Backdrop}
      backgroundStyle={styles.background}>
      <BottomSheetView
        onLayout={handleContentLayout}
        style={[styles.container, {paddingBottom: bottom + 20}]}>
        <Text style={styles.title}>Year</Text>
        <WheelPicker
          selectedIndex={index}
          onChange={setIndex}
          itemHeight={50}
          options={years}
          itemTextStyle={styles.text}
          selectedIndicatorStyle={styles.indicator}
        />
        <TouchableOpacity
          onPress={submit}
          activeOpacity={0.8}
          style={styles.submit}>
          <Text style={styles.text}>Select</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={dismiss}
          activeOpacity={0.8}
          style={styles.dismiss}>
          <Text style={styles.text}>Dismiss</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  background: {backgroundColor: 'black'},
  title: {color: 'white', fontWeight: '800', fontSize: 20},
  submit: {
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismiss: {
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: 'white'},
  indicator: {backgroundColor: 'black'},
});

export default YearPicker;
