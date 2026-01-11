
export interface Component {
  code: string;
  designation: string;
  quantityPerUnit: number; // in Grams
  unit: 'G' | 'KG' | 'ML';
}

export interface Alternative {
  id: string;
  description: string;
  validFrom: string;
  components: Component[];
}

export interface Article {
  code: string;
  designation: string;
  division: string;
  alternatives: Alternative[];
}

export interface MonthlyPlanning {
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
}

export type MonthKey = keyof MonthlyPlanning;

export const MONTH_NAMES: { key: MonthKey; label: string }[] = [
  { key: 'jan', label: 'Janvier' },
  { key: 'feb', label: 'Février' },
  { key: 'mar', label: 'Mars' },
  { key: 'apr', label: 'Avril' },
  { key: 'may', label: 'Mai' },
  { key: 'jun', label: 'Juin' },
  { key: 'jul', label: 'Juillet' },
  { key: 'aug', label: 'Août' },
  { key: 'sep', label: 'Septembre' },
  { key: 'oct', label: 'Octobre' },
  { key: 'nov', label: 'Novembre' },
  { key: 'dec', label: 'Décembre' },
];
