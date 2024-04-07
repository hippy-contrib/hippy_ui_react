import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Table, HiText } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Table 表格
 * */
const TableExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'} desc={'- `header`设置标题，`data`设置数据。'}>
        <Table
          header={['序号', '名字', '成绩']}
          data={[
            [1, '张三', 89],
            [2, '李四', 94],
          ]}
        />
      </ComExample>

      {/* 设置边框 */}
      <ComExample title={'设置边框'} desc={'- `borderStyle`设置边框。'}>
        <Table
          borderStyle={{ borderWidth: 1, borderColor: '#f00' }}
          header={['序号', '名字', '成绩']}
          data={[
            [1, '张三', 89],
            [2, '李四', 94],
          ]}
        />
      </ComExample>

      {/* 自定义样式 */}
      <ComExample
        title={'自定义样式'}
        desc={
          '- `headerStyle`设置标题样式。\n' +
          '- `headerCellStyle`设置标题单元格样式。\n' +
          '- `rowStyle`设置行样式。\n' +
          '- `cellStyle`设置单元格样式。\n' +
          '- `data`可以自定义节点。'
        }
      >
        <Table
          header={['序号', '名字', '成绩']}
          headerStyle={{ backgroundColor: '#f5f7fa' }}
          headerCellStyleFn={(p) => {
            if (p.columnIndex === 1) {
              return { fontWeight: 'bold' };
            }
          }}
          rowStyleFn={(p) => {
            if (p.rowIndex % 2 === 1) {
              return { backgroundColor: '#fafafa' };
            }
          }}
          cellStyleFn={(p) => {
            if (p.rowIndex === 3 && p.columnIndex === 2) {
              return { color: '#F56C6C' };
            }
          }}
          data={[
            [1, '张三', 89],
            [2, '李四', 94],
            [3, '王五', 90],
            [
              4,
              <HiText key={4} color={'#F56C6C'}>
                {'赵六'}
              </HiText>,
              59,
            ],
          ]}
        />
      </ComExample>
    </View>
  );
};

export default TableExample;
