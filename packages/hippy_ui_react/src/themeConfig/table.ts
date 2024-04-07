import { PixelRatio } from '@hippy/react';
import { ThemeConfigTable } from './types/table';

/**
 * Table 组件
 */
export const tableConfig: ThemeConfigTable = {
  tableStyle: {},
  tableRowStyleFn: () => {
    return {
      flexDirection: 'row',
    };
  },
  tableHeaderStyle: {
    flexDirection: 'row',
  },
  tableCellStyleFn: () => {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      flex: 1,
    };
  },
  tableBorderStyle: {
    borderColor: '#e7e1e1',
    borderWidth: 1 / PixelRatio.get(),
  },
  tableHeaderCellStyleFn: () => {
    return {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      flex: 1,
    };
  },
};
