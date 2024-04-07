import React, { FC, isValidElement, ReactNode } from 'react';
import { StyleSheet, TextStyleProp } from '@hippy/react';
import { HiText, pickTextStyle } from '../../../packages/hippy_ui_react/lib';

export interface ComTextProps {
  style?: TextStyleProp;
  children: ReactNode;
}

// 支持异化的文字
const ComText: FC<ComTextProps> = ({ children, style }) => {
  if (isValidElement(children)) {
    return <HiText style={style}>{children}</HiText>;
  } else if (children !== null && children !== undefined) {
    const txtStyle = pickTextStyle(style);
    const txtList = String(children).split('`');
    const renderList = txtList.map((txt, idx) => {
      if (idx % 2 === 0 || idx === txt.length - 1) {
        return (
          <HiText key={idx} style={txtStyle}>
            {txt}
          </HiText>
        );
      } else {
        return (
          <HiText key={idx} style={[txtStyle, styles.codeTxt]}>
            {txt}
          </HiText>
        );
      }
    });
    return <HiText style={style}>{renderList}</HiText>;
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  codeTxt: {
    lineHeight: 14,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    fontSize: 12,
    color: '#476582',
    backgroundColor: '#f8f9fa80',
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#eaecf0',
  },
});

export default ComText;
