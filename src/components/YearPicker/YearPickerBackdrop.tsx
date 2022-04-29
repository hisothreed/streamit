import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import React from 'react';

function Backdrop(props) {
  return (
    <BottomSheetBackdrop
      {...props}
      opacity={0.8}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
    />
  );
}

export default Backdrop;
