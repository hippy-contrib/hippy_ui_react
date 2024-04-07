import React, { FC } from 'react';
import { View } from '@hippy/react';
import { Tabs, HiText, UImage, transferStyle, Toast } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * Tabs 标签页
 * */
const TabsExample: FC = () => {
  const values = ['测试1', '测试2', '测试3', '测试4', '测试5', '测试6'];

  return (
    <View>
      {/* 基础用法 */}
      <ComExample
        title={'基础用法'}
        desc={
          '- 传入`values`。\n' +
          '- 组件会自动滚动到选中项并居中，可通过`autoScroll`取消。\n' +
          '- 初始偏移`initialContentOffset`优先级比`autoScroll`更高。'
        }
      >
        <Tabs
          values={['测试1', '测试2', '测试3']}
          onChange={(index) => {
            console.log('选中序号', index);
          }}
        />
        <Tabs
          values={['测试1', '测试2', '测试3', '测试4', '测试5', '测试6', '测试7', '测试8', '测试9', '测试10']}
          activeIndex={6}
        />
        <Tabs
          values={['测试1', '测试2', '测试3', '测试4', '测试5', '测试6', '测试7', '测试8', '测试9', '测试10']}
          activeIndex={6}
          autoScroll={null}
        />
        <Tabs
          values={['测试1', '测试2', '测试3', '测试4', '测试5', '测试6', '测试7', '测试8', '测试9', '测试10']}
          activeIndex={6}
          initialContentOffset={50}
        />
      </ComExample>

      {/* 常见用法 */}
      <ComExample
        title={'常见用法'}
        desc={
          '- 下划线：`showUnderline`\n' + '- 红点：`badgeList`\n' + '- 用图片异化展示\n' + '- 自动撑满：`equallyDivide`'
        }
      >
        <Tabs values={['测试1', '测试2', '测试3']} activeIndex={1} showUnderline={true} />
        <Tabs
          values={['测试1', '测试2', '测试3', '测试4']}
          activeIndex={1}
          badgeList={[
            { index: 0 },
            { index: 1, badgeProps: { value: 8 } },
            { index: 2, badgeProps: { value: '热', style: { marginRight: -9 } } },
            {
              index: 3,
              view: (
                <HiText
                  style={{
                    marginLeft: 0,
                    borderWidth: 0.5,
                    borderColor: 'rgba(42,42,42,0.05)',
                    marginBottom: 15,
                    height: 14,
                    lineHeight: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FF6A6A',
                    fontSize: 10,
                    color: '#fff',
                    paddingHorizontal: 3,
                    borderRadius: 10,
                  }}
                >
                  {'爱的供养'}
                </HiText>
              ),
            },
          ]}
        />
        <Tabs
          values={[
            '测试1',
            {
              text: '测试2',
              textImg:
                'data:image/webp;base64,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',
              textActiveImg:
                'data:image/webp;base64,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',
            },
            '测试3',
          ]}
          activeIndex={1}
        />
        <Tabs values={['测试1', '测试2', '测试3']} equallyDivide={1} />
      </ComExample>

      {/* 自定义渲染 */}
      <ComExample
        title={'自定义渲染'}
        desc={
          '通过`renderItem`自定义渲染，但有比较多的注意事项：\n' +
          '- 需要保留`params.tabProps`（里面有无障碍、自动撑满、点击等自动化处理）。\n' +
          '- 插入红点`params.badge`和下划线`params.underline`。\n' +
          '- 如果自定义的节点在首尾，注意额外的扩展间距（继承style）。\n' +
          '- 如果节点要占用前后空间，可以通过`itemStyle`设置前后节点的`paddingRight`等属性。'
        }
      >
        <Tabs
          values={values}
          showUnderline={true}
          badgeList={[{ index: 2 }, { index: 3, badgeProps: { value: '热' } }]}
          renderItem={(params) => {
            if (values[params.index] === '测试2') {
              // 不渲染
              return null;
            } else if (values[params.index] === '测试3') {
              // 自定义渲染
              return (
                <View
                  {...params.tabProps}
                  style={transferStyle([params.tabProps.style, { backgroundColor: '#ccc' }])}
                  onClick={(e?: any) => {
                    Toast.show('点击事件');
                    // 必要：保留tabProps事件
                    params.tabProps.onClick?.(e);
                  }}
                >
                  <UImage
                    src={
                      params.isActive
                        ? 'data:image/webp;base64,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'
                        : 'data:image/webp;base64,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'
                    }
                    style={{ marginTop: 4, height: 26, width: 44 }}
                    resizeMode={'cover'}
                  />
                  {params.badge}
                  {/* {params.underline} */}
                </View>
              );
            } else if (values[params.index] === '测试4') {
              // 加点前置图
              return (
                <View {...params.tabProps}>
                  <UImage
                    src={'https://qzonestyle.gtimg.cn/aoi/sola/20200325140943_1LOFHPZ0nD.png'}
                    style={{ marginTop: 4, height: 20, width: 20 }}
                    resizeMode={'cover'}
                  />
                  <HiText style={params.textStyle}>{params.tab.text}</HiText>
                  {params.badge}
                  {params.underline}
                </View>
              );
            } else if (values[params.index] === '测试5') {
              // 暴露出来的默认渲染
              return params.defaultRender(params);
            }
            // 剩下 return undefined 走默认
          }}
        />
      </ComExample>
    </View>
  );
};

export default TabsExample;
