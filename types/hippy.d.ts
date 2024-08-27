import { Component, ReactNode } from 'react';
import {
  GenericStyleProp,
  Style as HippyStyle,
  ViewStyle as HippyViewStyle,
  TextStyle as TextTextStyle,
  TextProps as HippyTextProps,
  ImageProps as HippyImageProps,
  ViewProps as HippyViewProps,
  TextInputProps as HippyTextInputProps,
  ScrollViewProps as HippyScrollViewProps,
  Animation as HippyAnimation,
  AnimationValue,
  AnimationDirection,
  TouchEvent,
} from '@types/hippy__react';
export * from "@types/hippy__react";

declare const __DOC__;

export type ViewStyle = HippyViewStyle & Record<string, any>;
export type TextStyle = TextTextStyle & Record<string, any>;
export type Style = HippyStyle & Record<string, any>;
export type TextProps = HippyTextProps & {
  style?: GenericStyleProp<TextStyle>;
  accessible?: boolean;
  accessibilityLabel?: string;
}
export interface ImageProps extends HippyImageProps {
  accessible?: boolean;
  accessibilityLabel?: string;
  style?: GenericStyleProp<ViewStyle>;
  children?: ReactNode;
}
export type ViewProps = HippyViewProps & {
  style?: GenericStyleProp<ViewStyle>;
  onClick?: (e?: any) => (void | boolean);
}
export interface ScrollViewProps extends HippyScrollViewProps {
  style?: GenericStyleProp<ViewStyle>;
  initialContentOffset?: number;
  accessible?: boolean;
  accessibilityLabel?: string;
  overScrollEnabled?: boolean;
  showScrollIndicator?: boolean;
  onLayout?: (e: LayoutEvent) => void;
}
export interface TextInputProps extends Omit<HippyTextInputProps, "onEndEditing"> {
  onKeyUp?: (e: {keyCode: number}) => void;
  onEndEditing?: (event: { text: string }) => void;
  style?: GenericStyleProp<TextStyle>;
}

export interface ScrollEvent {
  contentOffset: { x: number; y: number };
  contentInset: { top: number; left: number; bottom: number; right: number };
  contentSize: { width: number; height: number };
  layoutMeasurement: { width: number; height: number };
}

export declare function colorParse(v: any): string;

export interface AnimationOptions {
  /**
   * Initial value at `Animation` start
   */
  startValue?: AnimationValue;

  /**
   * End value when `Animation` end.
   */
  toValue?: AnimationValue;

  /**
   * Animation execution time
   */
  duration?: number;

  /**
   * Timeline mode of animation
   */
  mode?: "timing"; // TODO: fill more options

  /**
   * Delay starting time
   */
  delay?: number;

  /**
   * Value type, leave it blank in most case, except use rotate/color related
   * animation, set it to be 'deg' or 'color'.
   */
  valueType?: "deg"; // TODO: fill more options

  /**
   * Animation start position
   */
  direction?: AnimationDirection;

  /**
   * Animation interpolation type
   */
  timingFunction?: "linear" | "ease" | "bezier" | "in" | "ease-in" | "out" | "ease-out" | "inOut" | "ease-in-out";

  /**
   * Animation repeat times, use 'loop' to be always repeating.
   */
  repeatCount?: number | "loop";

  inputRange?: any[];
  outputRange?: any[];
}

export interface LayoutInfo {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface LayoutEvent {
  nativeEvent: {
    layout: LayoutInfo;
  };
  layout: LayoutInfo;
  target: HTMLElement | null | undefined;
  timeStamp: number;
}

export declare namespace StyleSheet {
  type NamedStyles<T> = { [P in keyof T]: Style };

  function create<T extends NamedStyles<T>>(
    styles: T | NamedStyles<T>
  ): T;
}

export interface TouchableEvent extends TouchEvent {
  pageX?: number;
  pageY?: number;
}

export declare class Animation extends HippyAnimation {
  setRef?: (ref: any) => void;
  setTransformStyleAttribute?: (transformName: string) => void;
  setStyleAttribute?: (styleName: string) => void;
  removeEventListener?: () => void;
  renderStyleAttribute?: (value: AnimationValue) => void;
}
export declare class View extends Component<ViewProps, any> {
  node?: HTMLElement;
}
export declare class Image extends Component<ImageProps, any> {
  static getSize: (
    uri: string,
    success: (width: number, height: number) => void,
    failure?: (err: typeof Error) => void,
  ) => void;

  static prefetch: (url: string) => void;
  static get resizeMode(): {
    contain: "contain";
    cover: "cover";
    stretch: "stretch";
    center: "center";
    repeat: "repeat"; // iOS Only
  };
}
export declare class TextInput extends Component<TextInputProps, any> {
  blur(): void;
  clear(): void;
  focus(): void;
  getValue(): Promise<string>;
  hideInputMethod(): void;
  setValue(value: string): void;
  isFocused?: () => void;
}
