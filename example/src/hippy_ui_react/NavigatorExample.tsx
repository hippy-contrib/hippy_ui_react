import React, { FC } from 'react';
import { View, Image } from '@hippy/react';
import { Navigator } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Navigator 导航栏
 * */
const NavigatorExample: FC = () => {
  return (
    <View>
      {/* 基础用法 */}
      <ComExample title={'基础用法'}>
        <Navigator />
        <Navigator title={'标题'} />
        <Navigator
          title={'标题'}
          rightNodes={
            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI+SURBVHgB7ZlNUsIwFMdfqwvcFS4gngDcucQTyA0cTyCegHIC4ASOS3dwAr0B9QT0BNClK/D/huKkhaQNpB+O+c0wbb5e/i9Nk/BKZLFY/jQOVYTneX1cukLWtVjuOI7H1XCdrVarqcxObgfQYc913f52u31Asp2zWYj6fhRFb2Jmq9UaI3+Q0wY7M4ETL0fLshpDuAfhQ50OU0Tr9bopZjSbzQUlRz+LEDZujhVcqlqxeHj/AfE6naWJ0hmwN4fdc2z+onQgHvmzxKP96CAzinyMTUjCVIRDPDW1+5JOIXTQhtFlKpvn9BOuAUREZAj0NURfvqKK/hTC6PsQmzCC9K1J4UwO8Yy0T1dWALGdVHpQkvj9UxbRd4BS8xHa52QQhfh7vlJOXKoAlXgMVEgalO6ASfFMqQ6cKh5tvmRlpTmgIx7pT+Tvzz/hZrOZyOxK9wFs94k1FOvwyQc/09NGpPAnAPHdosQzVaxCxsQzhTsAoYFwHgpMimdKeQeKpJKNzCS1dQAv/yNmwRq/Jd/L6tXWgXjl4v/FfKyX7gN1nkJt4d6TVbLvQNVYB6rGOlA1/8cBjtJRDVE5EKbSRkKBeYgj1yKBrK4qLpQIo2A7fy3jKcTx2DElteg7AGapNJ9JFkdGxwjejh73QYfh+5GsnZNhdAKDz1Qh6H+KbwPS0H7WS+yTYv6VQICIhK+qcKEq/AaNRuMdt1cYiTsqER55jpFmxWN1PjG1afdEOqY+ThwhjBePGceGyGKxWGrPDwX2CkyoP4UUAAAAAElFTkSuQmCC',
              }}
            />
          }
        />
      </ComExample>

      {/* 业务接入 */}
      <ComExample
        title={'业务接入'}
        desc={
          '建议业务二次封装，提供默认的：\n' +
          '- 不同实现模式（如悬浮透明、白底、黑底）\n' +
          '- 返回实现（router、关闭页面）\n' +
          '- 电池栏颜色设置\n' +
          '- 内置右边部分图标\n' +
          '- 提供全局设置方法（如提供静态方法让业务快速修改导航栏样式）'
        }
      ></ComExample>
    </View>
  );
};

export default NavigatorExample;
