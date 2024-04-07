import { Animation, AnimationOptions } from '@hippy/react';
import { isWeb } from '../utils/Utils';

export interface SliderOptions extends AnimationOptions {}
export interface SliderSetRefOptions {
  ref: any;
  transformStyleAttribute?:
    | 'translateY'
    | 'translateX'
    | 'rotate'
    | 'rotateX'
    | 'rotateY'
    | 'rotateZ'
    | 'scale'
    | 'scaleX'
    | 'scaleY'
    | 'skewX'
    | 'skewY'
    | string;
  styleAttribute?: string;
}
export function getSlideManager(options: SliderOptions) {
  const slideManager = {
    options,
    ref: null as any,
    animation: new Animation({
      startValue: options.startValue,
      toValue: options.toValue,
      duration: options.duration,
      delay: options.delay || 0,
      mode: 'timing',
      timingFunction: options.timingFunction as any,
    }),
    setRef(params: SliderSetRefOptions) {
      const { ref, transformStyleAttribute, styleAttribute } = params;
      slideManager.ref = ref;
      slideManager.animation.setRef?.(ref);
      transformStyleAttribute && slideManager.animation.setTransformStyleAttribute?.(transformStyleAttribute);
      styleAttribute && slideManager.animation.setStyleAttribute?.(styleAttribute);
    },
    sliding: false,
    hasShow: false,
    showCb: null as null | Promise<void>,
    show: function (): Promise<void> {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      if (slideManager.hideCb) {
        return slideManager.hideCb.then(() => {
          slideManager.hideCb = null;
          return slideManager.show();
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      if (!slideManager.showCb) {
        // if (slideManager.sliding || slideManager.hasShow) return Promise.resolve();
        slideManager.sliding = true;
        slideManager.animation.removeEventListener?.();
        slideManager.animation.updateAnimation({
          startValue: options.startValue,
          toValue: options.toValue,
        });
        slideManager.showCb = new Promise((resolve) => {
          slideManager.animation.onAnimationEnd(() => {
            slideManager.sliding = false;
            slideManager.hasShow = true;
            // web实现有问题，会超出toValue，这里重置一下
            if (isWeb() && slideManager.ref?.node) {
              slideManager.animation.renderStyleAttribute?.(options.toValue);
            }
            resolve();
          });
          slideManager.animation.start();
        });
      }
      return slideManager.showCb;
    },
    hideCb: null as null | Promise<void>,
    hide: function (): Promise<void> {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      if (slideManager.showCb) {
        return slideManager.showCb.then(() => {
          slideManager.showCb = null;
          return slideManager.hide();
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      if (!slideManager.hideCb) {
        // if (slideManager.sliding || !slideManager.hasShow) return Promise.resolve();
        slideManager.sliding = true;
        slideManager.animation.removeEventListener?.();
        slideManager.animation.updateAnimation({
          startValue: options.toValue,
          toValue: options.startValue,
        });
        slideManager.hideCb = new Promise((resolve) => {
          slideManager.animation.onAnimationEnd(() => {
            slideManager.sliding = false;
            slideManager.hasShow = false;
            resolve();
          });
          slideManager.animation.start();
        });
      }
      return slideManager.hideCb;
    },
    trigger: function () {
      if (slideManager.sliding) return Promise.resolve();
      if (slideManager.hasShow) {
        return slideManager.hide();
      } else {
        return slideManager.show();
      }
    },
    destroy() {
      slideManager.animation.destroy?.();
    },
  };
  return slideManager;
}
