import { StyleSheet, Dimensions } from '@hippy/react';

export const comStyle = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const WINDOW_WIDTH = Dimensions.get('window').width;
