import React, { FC, ReactNode } from 'react';
import { View, StyleSheet, ViewStyleProp } from '@hippy/react';
import { Consumer } from '../../../packages/hippy_ui_react/lib';

import ComText from './ComText';

export interface ComExampleProps {
  style?: ViewStyleProp;
  title: string;
  desc?: string;
  children?: ReactNode;
}

// 组件示例
const ComExample: FC<ComExampleProps> = ({ title, desc, children, style }) => {
  return (
    <Consumer>
      {(consumerValue) => {
        return (
          <View style={[styles.wrap, { borderColor: consumerValue.themeConfig.colorFillOther }]}>
            <ComText style={[styles.title, { backgroundColor: consumerValue.themeConfig.colorFillOther }]}>
              {title}
            </ComText>
            <ComText style={{ backgroundColor: '#F2F6FC40', padding: 5 }}>{desc}</ComText>
            <View style={[styles.content, style]}>{children}</View>
          </View>
        );
      }}
    </Consumer>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#F2F6FC',
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    paddingHorizontal: 16,
    lineHeight: 40,
  },
  content: {
    padding: 10,
  },
});

export default ComExample;
