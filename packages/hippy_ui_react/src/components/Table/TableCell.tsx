import React, { Component, isValidElement } from 'react';
import { View } from '@hippy/react';
import HiText from '../HiText';
import { TableCellProps } from './PropsType';
import { pickTextStyle } from '../../utils/Styles';

/**
 * Table 单元格
 * */
class TableCell extends Component<TableCellProps, {}> {
  render() {
    const { data, style } = this.props;
    return (
      <View style={style}>{isValidElement(data) ? data : <HiText style={pickTextStyle(style)}>{data}</HiText>}</View>
    );
  }
}

export default TableCell;
