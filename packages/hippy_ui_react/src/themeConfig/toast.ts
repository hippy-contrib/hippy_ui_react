import { ThemeConfigToast } from './types/toast';

/**
 * Toast 组件
 */
export const toastConfig: ThemeConfigToast = {
  toastStyle: {
    marginHorizontal: 20,
    alignSelf: 'center',
    minHeight: 34,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    backgroundColor: 'rgba(17, 17, 17, 0.9)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  toastTextStyle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.85,
  },
};
