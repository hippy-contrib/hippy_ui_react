import { replenishNum } from '../utils/Utils';

/**
 * 格式化时间
 * */
export function formatDate(format: string, date?: Date | string | number) {
  const _date = new Date(date || new Date());
  return format
    .replace(/YYYY|yyyy/g, _date.getFullYear().toString())
    .replace(/MM/g, replenishNum(_date.getMonth() + 1))
    .replace(/dd/g, replenishNum(_date.getDate()))
    .replace(/HH/g, replenishNum(_date.getHours()))
    .replace(/mm/g, replenishNum(_date.getMinutes()))
    .replace(/ss/g, replenishNum(_date.getSeconds()))
    .replace(/SSS/g, replenishNum(_date.getMilliseconds()));
}
