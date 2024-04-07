import { ThemeConfigSlider } from './types/slider';

/**
 * Radio 组件
 */
export const sliderConfig: ThemeConfigSlider = {
  sliderWrapStyle: {
    position: 'relative',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    height: 18,
    paddingHorizontal: 18 / 2,
  },
  sliderLineStyle: {
    alignSelf: 'stretch',
    height: 4,
    backgroundColor: '#F2F2F6',
    borderRadius: 2,
  },
  sliderActiveLineStyle: {
    position: 'absolute',
    height: 4,
    left: 0,
    borderRadius: 2,
    backgroundColor: '#FF6D77',
  },
  sliderBlockStyle: {
    position: 'absolute',
    width: 18,
    height: 18,
    top: 0,
    borderRadius: 18 / 2,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  sliderBlockImageStyle: {
    flex: 1,
  },
};
