import { StyleSheet } from '@hippy/react';

export const styles = StyleSheet.create({
  baseVertical: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto',
    // overflowScrolling: "touch",
  },
  baseHorizontal: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden',
    // overflowScrolling: "touch",
  },
  contentContainerVertical: {
    collapse: false,
    flexDirection: 'column',
  },
  contentContainerHorizontal: {
    collapse: false,
    flexDirection: 'row',
  },
  scrollDisable: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    touchAction: 'none',
  },
  hideScrollbar: {
    scrollbarWidth: 'none',
  },
  pagingEnabledHorizontal: {
    scrollSnapType: 'x mandatory',
  },
  pagingEnabledVertical: {
    scrollSnapType: 'y mandatory',
  },
  pagingEnabledChild: {
    scrollSnapAlign: 'start',
  },
});
