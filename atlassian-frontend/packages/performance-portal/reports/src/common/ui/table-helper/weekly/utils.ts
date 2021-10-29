import format from 'date-fns/format';
import startOfISOWeek from 'date-fns/startOfISOWeek';

import { ChartSnapshotData, ToplineTrendData } from '../../../types';
import { median } from '../../../utils/median';

export const seriesToWeeklyMedian = (series?: ToplineTrendData[]) => {
  if (!series) {
    return [];
  }
  const weekDataMap = series.reduce((weekDataMap, item) => {
    const weekStart = format(
      startOfISOWeek(new Date(item.dateTime)),
      'yyyy-MM-dd',
    );

    const weekDatas = weekDataMap.get(weekStart) ?? [];
    weekDatas.push(item);
    weekDataMap.set(weekStart, weekDatas);

    return weekDataMap;
  }, new Map<string, ToplineTrendData[]>());

  const weekNumbers = [...weekDataMap.keys()];

  const weekMedianMap = weekNumbers.reduce((weekMedianMap, weekStart) => {
    weekMedianMap.set(weekStart, {
      dateTime: weekStart.substr(0, 10),
      value: median(weekDataMap.get(weekStart)?.map((d) => d.value) ?? []),
    });
    return weekMedianMap;
  }, new Map<string, ChartSnapshotData>());

  return [...weekMedianMap.values()];
};
