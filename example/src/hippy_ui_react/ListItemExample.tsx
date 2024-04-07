import React, { FC } from 'react';
import { View, Image } from '@hippy/react';
import { ListItem, Toast, HiText, Switch, Tag, UImage } from '../../../packages/hippy_ui_react/lib';
import ComExample from '../utils/ComExample';

/**
 * ListItem 列表条目
 * */
const ListItemExample: FC = () => {
  const AVATAR = 'https://qzonestyle.gtimg.cn/aoi/sola/20200323143705_SFlaa8ofC4.png';

  return (
    <View>
      {/* 基础用法 */}
      <ComExample
        title={'基础用法'}
        desc={
          '- `rank`设置排名\n' +
          '- `thumb`设置预览图\n' +
          '- `thumbCircle`设置预览图为圆形\n' +
          '- `title`设置标题\n' +
          '- `note`设置副标题\n' +
          '- `moreNote`设置辅助文案\n' +
          '- `buttonProps`设置右侧按钮'
        }
      >
        <ListItem thumb={AVATAR} title={'主文案'} />
        <ListItem thumb={AVATAR} title={'꧁꫞꯭翱翔꫞꧂'} note={'辅助文案'} />
        <ListItem
          rank={1}
          thumb={AVATAR}
          title={'꧁꫞꯭翱翔꫞꧂'}
          titleNoHeight={true}
          note={'辅助文案'}
          moreNote={'更多辅助文案'}
        />
        <ListItem
          rank={4}
          thumb={AVATAR}
          thumbCircle={true}
          title={'主文案'}
          note={'辅助文案'}
          moreNote={'更多辅助文案'}
          buttonProps={{
            children: 'K歌',
            onPress: () => {
              Toast.show('点击按钮');
            },
          }}
          onPress={() => {
            Toast.show('点击条目');
          }}
        />
      </ComExample>

      {/* 自定义内容 */}
      <ComExample
        title={'自定义内容'}
        desc={
          '- 传入`ReactElement`来自定义节点。\n' +
          '- `rank`会被自动注入`style: {width}`。\n' +
          '- `thumb`会被自动注入`style: {marginRight}`。\n' +
          '- `title/note/moreNote`会被自动注入`style: {height,flex,flexShrink,fontSize,color}`。'
        }
      >
        <ListItem
          rank={
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <HiText style={{ textAlign: 'center', color: 'rgb(254, 79, 79)', fontWeight: '600' }}>{'01'}</HiText>
              <Image
                source={{ uri: 'https://y.qq.com/music/common/upload/t_cm3_photo_publish/4343041.png' }}
                style={{ width: 16, height: 16 }}
              />
            </View>
          }
          thumb={
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 64,
                height: 64,
                marginRight: 15,
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <UImage src={AVATAR} style={{ width: 64, height: 64 }} />
              <UImage
                src={AVATAR}
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: 24,
                  height: 24,
                  borderWidth: 1,
                  borderColor: '#fff',
                }}
              />
            </View>
          }
          titleNoHeight={true}
          title={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <HiText size={16} numberOfLines={1} style={{ flexShrink: 1 }}>
                {'꧁꫞꯭翱翔꫞꧂'}
              </HiText>
              <Tag style={{ marginLeft: 3 }}>{'标签'}</Tag>
            </View>
          }
          note={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <HiText size={14} color={HiText.color.textSecondary} numberOfLines={1}>
                {'辅助文案'}
              </HiText>
              <Tag style={{ marginLeft: 3 }}>{'标签'}</Tag>
            </View>
          }
          moreNote={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <HiText size={14} color={HiText.color.textSecondary} style={{ flexShrink: 1 }} numberOfLines={1}>
                {'更多辅助文案，文案很长文案很长文案很长'}
              </HiText>
              <Tag style={{ marginLeft: 3 }}>{'标签'}</Tag>
            </View>
          }
          extraOperate={<Switch style={{ marginLeft: 4 }} />}
          buttonProps={{
            children: 'K歌',
            onPress: () => {
              Toast.show('点击按钮');
            },
          }}
        />
      </ComExample>
    </View>
  );
};

export default ListItemExample;
