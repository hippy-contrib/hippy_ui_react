import React, { ReactNode } from 'react';
import { getThemeConfig } from '../themeConfig';
import { ConsumerProps, HippyReactUIContext, ProviderValue } from './PropsType';

/**
 * @visibleName Consumer 全局模式
 */
export default class Consumer extends React.Component<ConsumerProps, any> {
  render() {
    return (
      <HippyReactUIContext.Consumer>
        {(value: ProviderValue): ReactNode => {
          const { themeConfigFunc, theme: valueTheme, renderInfo } = value;
          const { theme = valueTheme } = this.props;
          return this.props.children({
            theme,
            themeConfig: getThemeConfig({
              theme,
              themeConfigFunc,
            }),
            renderInfo,
          });
        }}
      </HippyReactUIContext.Consumer>
    );
  }
}
