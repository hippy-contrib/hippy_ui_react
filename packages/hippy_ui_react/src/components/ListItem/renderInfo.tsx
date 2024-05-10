import React, { isValidElement, cloneElement, ReactElement } from 'react';
import { ViewStyle } from '@hippy/react';
import { ListItemRenderInfo, ListItemRenderParams } from '../../themeConfig/types/listItem';
import { transferStyle } from '../../utils/Styles';
import { isNullOrUndefined, replenishNum } from '../../utils/Utils';
import HiText from '../HiText';
import UImage from '../UImage';

/** ListItem：获取渲染信息 */
export default function getRenderInfo(params: ListItemRenderParams): ListItemRenderInfo {
  const {
    consumerValue: { renderInfo, themeConfig },
    props,
  } = params;
  const {
    leftAccessible,
    style,
    accessible,
    accessibilityLabel,
    onPress,
    onLayout,
    onLongClick,
    title,
    note,
    moreNote,
    thumb,
    rank,
    buttonProps,
  } = props;
  const wrapProps = themeConfig.listItemWrapPropsFn(params);
  const rankProps = themeConfig.listItemRankPropsFn(params);
  const thumbProps = themeConfig.listItemThumbPropsFn(params);
  const titleProps = themeConfig.listItemTitlePropsFn(params);
  const noteProps = themeConfig.listItemNotePropsFn(params);
  const moreNoteProps = themeConfig.listItemMoreNotePropsFn(params);

  const result: ListItemRenderInfo = {
    wrapProps: {
      accessible,
      accessibilityLabel,
      onClick: onPress,
      onLayout,
      onLongClick,
      style: transferStyle([wrapProps.style, style]),
    },
    leftProps: {
      ...themeConfig.listItemLeftProps,
      accessible: leftAccessible,
      style: transferStyle(themeConfig.listItemLeftProps.style),
    },
    leftInfoProps: themeConfig.listItemLeftInfoProps,
    rank: isNullOrUndefined(rank) ? null : isValidElement(rank) ? (
      cloneElement<any>(rank, {
        style: transferStyle([
          { width: (rankProps.style as ViewStyle).width },
          (rank as ReactElement).props.style,
        ]) as any,
      })
    ) : (
      <HiText {...rankProps}>{typeof rank === 'number' ? replenishNum(rank) : rank}</HiText>
    ),
    thumb: isNullOrUndefined(thumb) ? null : isValidElement(thumb) ? (
      cloneElement<any>(thumb, {
        style: transferStyle([
          { marginRight: (thumbProps.style as ViewStyle).marginRight },
          (thumb as ReactElement).props.style,
        ]) as any,
      })
    ) : (
      <UImage {...thumbProps} />
    ),
    title: isValidElement(title) ? (
      cloneElement<any>(title, {
        style: transferStyle([titleProps.style, (title as ReactElement).props.style]) as any,
      })
    ) : (
      <HiText {...titleProps}>{title}</HiText>
    ),
    note: isNullOrUndefined(note) ? null : isValidElement(note) ? (
      cloneElement<any>(note, {
        style: transferStyle([noteProps.style, (note as ReactElement).props.style]) as any,
      })
    ) : (
      <HiText {...noteProps}>{note}</HiText>
    ),
    moreNote: isNullOrUndefined(moreNote) ? null : isValidElement(moreNote) ? (
      cloneElement<any>(moreNote, {
        style: transferStyle([moreNoteProps.style, (moreNote as ReactElement).props.style]) as any,
      })
    ) : (
      <HiText {...moreNoteProps}>{moreNote}</HiText>
    ),
    buttonProps: buttonProps
      ? {
          ...themeConfig.listItemButtonProps,
          ...buttonProps,
          style: transferStyle([themeConfig.listItemButtonProps.style, buttonProps.style]),
        }
      : null,
  };
  return renderInfo?.listItem?.({ ...params, defaultRenderInfo: result }) || result;
}
