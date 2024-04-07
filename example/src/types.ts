import { ReactNode } from 'react';
import { ThemeMode } from '../../packages/hippy_ui_react/lib';

export interface Menu {
  name: string;
  page: ReactNode;
}

export interface GroupMenu {
  groupName: string;
  subMenu: Menu[];
}

export interface HippyReactUiExampleState {
  theme: ThemeMode;
  subPage: Menu;
}
