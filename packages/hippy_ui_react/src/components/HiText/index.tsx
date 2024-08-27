import React, { Component, PropsWithChildren } from 'react';
import { Text } from '@hippy/react';
import { HiTextColor, HiTextProps, HiTextWeight } from './PropsType';
import Consumer from '../../provider/Consumer';
import getRenderInfo from './renderInfo';

/**
 * - 继承自`Text`的组件
 * @visibleName HiText 文本
 */
export class HiText extends Component<PropsWithChildren<HiTextProps>, {}> {
  static weight = HiTextWeight;
  static color = HiTextColor;

  static htmlEncodeTable = [
    { reg: /&quot;/g, tag: '\u0022' },
    { reg: /&apos;/g, tag: '\u0027' },
    { reg: /&amp;/g, tag: '\u0026' },
    { reg: /&lt;/g, tag: '\u003C' },
    { reg: /&gt;/g, tag: '\u003E' },
    { reg: /&copy;/g, tag: '\u00A9' },
  ];

  /**
   *  html解码
   *  @param str 字符串
   *  */
  static decodeHTML(str: string) {
    let _str = str;
    HiText.htmlEncodeTable.forEach((item) => {
      _str = _str.replace(item.reg, item.tag);
    });
    return _str;
  }

  /**
   *  html编码
   *  @param str 字符串
   *  */
  static encodeHTML(str: string) {
    const resMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '\x27': '&#39;',
      '\x22': '&quot;',
    };
    const tmpArr = [];
    for (const key in resMap) {
      key !== '&' && tmpArr.push(key);
    }
    const resReg = new RegExp('(' + tmpArr.join('|') + ')', 'g');

    const _str = (str || '').toString().replace(resReg, function ($0) {
      return resMap[$0];
    });

    return _str;
  }

  render() {
    const { props } = this;
    const { theme } = props;
    return (
      <Consumer theme={theme}>
        {(consumerValue) => {
          const { textProps } = getRenderInfo({ consumerValue, props });
          return <Text {...textProps} />;
        }}
      </Consumer>
    );
  }
}

export default HiText;
