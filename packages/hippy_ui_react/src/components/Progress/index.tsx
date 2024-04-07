import React, { Component } from 'react';
import { StyleSheet, View } from '@hippy/react';
import { ProgressLineCap, ProgressProps, ProgressState, ProgressType } from './PropsType';
import Consumer from '../../provider/Consumer';
import { isWeb } from '../../utils/Utils';
import { transferStyle } from '../../utils/Styles';

/**
 * @visibleName Progress 进度条
 */
export class Progress extends Component<ProgressProps, ProgressState> {
  static defaultProps = {
    strokeWidth: 10,
    duration: 0,
    size: 100,
    lineCap: ProgressLineCap.round,
    type: ProgressType.line,
  };

  static lineCap = ProgressLineCap;
  static type = ProgressType;

  private unmount = false;
  private refLineWrap: (View & { node?: HTMLElement }) | null;
  constructor(props: ProgressProps) {
    super(props);
    this.state = {
      lineWidth: 0,
      percent: 0,
    };
  }

  componentDidMount() {
    this.startAnimation(0, this.props.percent);
  }

  shouldComponentUpdate(
    nextProps: Readonly<ProgressProps>,
    nextState: Readonly<ProgressState>,
    nextContext: any,
  ): boolean {
    if (nextProps.percent !== this.props.percent) {
      this.startAnimation(this.props.percent, nextProps.percent - this.props.percent);
    }
    return true;
  }

  componentDidUpdate(prevProps: Readonly<ProgressProps>, prevState: Readonly<ProgressState>, snapshot?: any) {
    this.resetLineWidth();
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  private animationFrameId: number | null = null;

  // 动画
  private startAnimation(prevPercent: number, gap: number) {
    const loop = () => {
      if (this.unmount) {
        return;
      }
      // 关闭动画
      if (!this.props.duration || this.props.duration < 0) {
        this.setState({
          ...this.state,
          percent: this.props.percent,
        });
        return;
      }
      const percent = this.state.percent + gap / (this.props.duration / 1000) / 2 / 16;

      this.setState({
        ...this.state,
        percent: Math.min(Math.max(0, percent), 100),
      });
      // gap 若为负值表现为回退动画
      if (gap >= 0 && this.state.percent < prevPercent + gap) {
        this.animationFrameId = requestAnimationFrame(loop);
      } else if (gap < 0 && this.state.percent > prevPercent + gap) {
        this.animationFrameId = requestAnimationFrame(loop);
      } else {
        this.props.onFinish && this.props.onFinish();
      }
    };
    // 防止多次调用动画闪烁
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(loop);
  }

  // 计算圆环样式
  private getCircleStyles(params: { defaultColor: string; defaultUnderColor: string }) {
    const { defaultColor, defaultUnderColor } = params;
    const { strokeWidth, size, color = defaultColor, underColor = defaultUnderColor } = this.props;
    const borderWidth = strokeWidth;
    const borderColor = color;
    const borderRadius = size / 2;
    const commonCircleStyle = {
      width: size,
      height: size,
      borderWidth,
      borderRadius,
      borderColor,
    };
    const { percent } = this.state;
    const leftCircleRotate = percent > 50 ? `${(percent - 50) * 3.6}deg` : '0deg';
    const rightCircleRotate = percent <= 50 ? `${percent * 3.6}deg` : '180deg';
    const capRotate = `${percent * 3.6}deg`;

    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        width: size,
        height: size,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      },
      circle: {
        flexDirection: 'row',
        width: size,
        height: size,
        position: 'absolute',
      },
      underground: {
        position: 'absolute',
        width: size,
        height: size,
        borderWidth,
        borderRadius,
        top: 0,
        left: 0,
        borderColor: underColor,
      },
      left: {
        position: 'relative',
        width: size / 2,
        height: size,
        left: 0,
        overflow: 'hidden',
      },
      leftCircleTransform: {
        width: size,
        height: size,
        position: 'absolute',
        transform: [{ rotateZ: leftCircleRotate }],
      },
      leftCircleWrap: {
        position: 'absolute',
        width: size / 2,
        height: size,
        left: size / 2,
        overflow: 'hidden',
      },
      leftCircle: {
        ...commonCircleStyle,
        position: 'relative',
        left: -size / 2,
      },
      right: {
        position: 'relative',
        width: size / 2,
        height: size,
        right: 0,
        overflow: 'hidden',
      },
      rightCircleTransform: {
        width: size,
        height: size,
        position: 'absolute',
        left: -size / 2,
        overflow: 'hidden',
        transform: [{ rotateZ: rightCircleRotate }],
      },
      rightCircleWrap: {
        position: 'relative',
        width: size / 2,
        height: size,
        overflow: 'hidden',
      },
      rightCircle: {
        ...commonCircleStyle,
      },
      capRotateWrap: {
        position: 'absolute',
        flexDirection: 'row',
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotateZ: capRotate }],
      },
      capFixWrap: {
        position: 'absolute',
        flexDirection: 'row',
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      },
      cap: {
        position: 'relative',
        top: -size / 2 + borderWidth / 2,
        borderRadius: borderWidth / 2,
        height: borderWidth,
        width: borderWidth,
        backgroundColor: color,
      },
    });
  }

  // 渲染：环形进度条
  renderCircle() {
    return (
      <Consumer>
        {(consumerValue) => {
          const { children, lineCap, accessible, percent, style } = this.props;
          let { accessibilityLabel } = this.props;
          const styles = this.getCircleStyles({
            defaultColor: consumerValue.themeConfig.colorTheme,
            defaultUnderColor: consumerValue.themeConfig.colorFillOther,
          });
          if (accessibilityLabel === undefined && !children) {
            accessibilityLabel = `进度：${percent}%`;
          }
          return (
            <View style={style} accessible={accessible} accessibilityLabel={accessibilityLabel}>
              <View style={styles.underground}></View>
              <View style={styles.container}>
                <View style={styles.circle}>
                  <View style={styles.left}>
                    <View style={styles.leftCircleTransform}>
                      <View style={styles.leftCircleWrap}>
                        <View style={styles.leftCircle}></View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.right}>
                    <View style={styles.rightCircleTransform}>
                      <View style={styles.rightCircleWrap}>
                        <View style={styles.rightCircle}></View>
                      </View>
                    </View>
                  </View>
                </View>
                {children}
              </View>
              {/* 首尾圆角 */}
              {lineCap === ProgressLineCap.round && (
                <>
                  <View style={styles.capRotateWrap}>
                    <View style={styles.cap} />
                  </View>
                  <View style={styles.capFixWrap}>
                    <View style={styles.cap} />
                  </View>
                </>
              )}
            </View>
          );
        }}
      </Consumer>
    );
  }

  // web更新line宽度
  resetLineWidth = () => {
    if (this.props.type === ProgressType.line && isWeb() && this.refLineWrap) {
      const newLineWidth = this.refLineWrap.node.clientWidth;
      if (newLineWidth !== this.state.lineWidth) {
        this.setState({
          ...this.state,
          lineWidth: newLineWidth,
        });
      }
    }
  };

  // 渲染：直线进度
  renderLine() {
    return (
      <Consumer>
        {(consumerValue) => {
          const {
            children,
            lineCap,
            accessible,
            percent,
            color = consumerValue.themeConfig.colorTheme,
            underColor = consumerValue.themeConfig.colorFillOther,
            strokeWidth,
            style,
          } = this.props;
          let { accessibilityLabel } = this.props;
          if (accessibilityLabel === undefined && !children) {
            accessibilityLabel = `进度：${percent}%`;
          }
          const borderRadius = lineCap === ProgressLineCap.round ? strokeWidth / 2 : 0;

          return (
            <View
              style={transferStyle([
                {
                  backgroundColor: underColor,
                  borderRadius,
                  backgroundImage: underColor.trim().startsWith('linear-gradient') ? underColor : undefined,
                },
                style,
              ])}
              accessible={accessible}
              accessibilityLabel={accessibilityLabel}
              onLayout={(e) => {
                this.setState({
                  ...this.state,
                  lineWidth: e.layout.width,
                });
              }}
              ref={(r) => {
                this.refLineWrap = r;
                this.resetLineWidth();
              }}
            >
              <View
                style={{
                  height: strokeWidth,
                  backgroundColor: color,
                  backgroundImage: color.trim().startsWith('linear-gradient') ? color : undefined,
                  borderRadius,
                  width: (this.state.lineWidth * this.state.percent || 0) / 100,
                }}
              >
                {children}
              </View>
            </View>
          );
        }}
      </Consumer>
    );
  }

  render() {
    return this.props.type === ProgressType.circle ? this.renderCircle() : this.renderLine();
  }
}

export default Progress;
