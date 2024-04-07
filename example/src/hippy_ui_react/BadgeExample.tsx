import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Badge, HiText, Button } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Badge 标记
 * */
const BadgeExample: FC = () => {
  const [hasRead, setHasRead] = React.useState(false);

  return (
    <View>
      {/* 基础用法 */}
      <ComExample
        title={'基础用法'}
        desc={
          '- 没有包裹元素时独立展示\n' +
          '- isDot标记为纯红点\n' +
          '- 超出`maxValue`显示`${maxValue}+`\n' +
          '- 可自定义内容'
        }
      >
        <Badge />
        <Badge isDot={true} />
        <Badge value={0} />
        <Badge value={999} />
        <Badge
          value={
            <HiText size={10} color={'#fff'}>
              {'hot'}
            </HiText>
          }
        />
      </ComExample>

      {/* 嵌套使用 */}
      <ComExample title={'嵌套使用'}>
        <Badge value={hasRead ? null : 99}>
          <HiText>{'消息'}</HiText>
        </Badge>
        <Badge isDot={!hasRead}>
          <Button
            onPress={() => {
              setHasRead(!hasRead);
            }}
            round={false}
          >
            {'查看'}
          </Button>
        </Badge>
      </ComExample>
    </View>
  );
};

export default BadgeExample;
