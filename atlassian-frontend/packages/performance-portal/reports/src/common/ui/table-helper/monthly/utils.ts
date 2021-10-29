import { ChartSnapshotData, ToplineTrendData } from '../../../types';
import { median } from '../../../utils/median';

export const seriesToEndOfMonthMedian = (series?: ToplineTrendData[]) => {
  if (!series) {
    return [];
  }
  const monthDataMap = series.reduce((monthDataMap, item) => {
    const date = new Date(item.dateTime);
    const monthIdx = date.getUTCFullYear() + '-' + date.getUTCMonth();

    const monthDatas = monthDataMap.get(monthIdx) ?? [];
    monthDatas.push(item);
    monthDataMap.set(monthIdx, monthDatas.slice(-5));

    return monthDataMap;
  }, new Map<string, ToplineTrendData[]>());

  const monthIndexes = [...monthDataMap.keys()];

  const eomMedianMap = monthIndexes.reduce((eomMedianMap, monthIdx) => {
    eomMedianMap.set(monthIdx, {
      dateTime: `${monthIdx}-01`,
      value: median(monthDataMap.get(monthIdx)?.map((d) => d.value) ?? []),
    });
    return eomMedianMap;
  }, new Map<string, ChartSnapshotData>());

  return [...eomMedianMap.values()];
};
