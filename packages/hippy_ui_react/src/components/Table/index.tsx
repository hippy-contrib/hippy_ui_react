import React, { Component } from 'react';
import { View } from '@hippy/react';
import { TableProps } from './PropsType';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';
import TableRow from './TableRow';

/**
 * @visibleName Table 表格
 */
export class Table extends Component<TableProps, {}> {
  render() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { wrapProps, borderStyle, headerStyle, rowStyleFn, headerCellStyleFn, cellStyleFn } = getRenderInfo({
            consumerValue,
            props: this.props,
          });
          const { header, data } = this.props;
          return (
            <View {...wrapProps}>
              {header ? (
                <TableRow
                  data={header}
                  borderStyle={borderStyle}
                  style={headerStyle}
                  cellStyleFn={(params) => headerCellStyleFn(params)}
                />
              ) : null}
              {data?.map((row, idx) => {
                return (
                  <TableRow
                    key={idx}
                    data={row}
                    borderStyle={borderStyle}
                    style={rowStyleFn({ rowIndex: idx })}
                    cellStyleFn={(params) => {
                      return cellStyleFn({ rowIndex: idx, columnIndex: params.columnIndex });
                    }}
                  />
                );
              })}
            </View>
          );
        }}
      </Consumer>
    );
  }
}

export default Table;
