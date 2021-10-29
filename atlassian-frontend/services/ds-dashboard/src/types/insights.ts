export type InsightData = {
  month: string;
  count: number;
}[];

export type AsideDataCell =
  | { type: 'text'; value: string | null }
  | { type: 'code'; value: string | null }
  | { type: 'date'; value: number | null };

export type AsideDataRow = AsideDataCell[];

export type AsideData = {
  head: string[];
  rows: AsideDataRow[];
};

type ReferencePosition = { type: 'x'; x: string } | { type: 'y'; y: number };

export type Reference = {
  label: string;
} & ReferencePosition;

export type Insight = {
  title: string;
  data: InsightData;
  references?: Reference[];
  aside?: AsideData;
};

export type GetInsight = () => Promise<Insight>;
