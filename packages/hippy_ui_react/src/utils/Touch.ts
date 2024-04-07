export interface Touche {
  pageX: number;
  pageY: number;
}

export const getPageXY = (e: any): Touche => {
  // mouse
  if (e.page_x) {
    return {
      pageX: e.page_x,
      pageY: e.page_y,
    };
  } else if (e.pageX) {
    return e as Touche;
  } else if (e.touches?.[0]) {
    // touchstart,move
    return e.touches[0];
  } else if (e.changedTouches?.[0]) {
    // touchend
    return e.changedTouches[0];
  } else {
    console.error('无法获取事件坐标！');
    return { pageX: 0, pageY: 0 };
  }
};
