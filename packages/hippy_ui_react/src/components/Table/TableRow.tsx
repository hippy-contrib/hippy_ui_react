import React, { Component } from 'react';
import { View } from '@hippy/react';
import TableCell from './TableCell';
import { TableRowProps } from './PropsType';

/**
 * Table 行
 * */
export class TableRow extends Component<TableRowProps, {}> {
  render() {
    const { data, style, cellStyleFn } = this.props;
    return (
      <View style={style}>
        {data.map((value, index) => (
          <TableCell key={index} data={value} style={cellStyleFn?.({ columnIndex: index })} />
        ))}
      </View>
    );
  }
}

export default TableRow;
