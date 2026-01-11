
import { Article } from './types';

export const ARTICLES_DB: Article[] = [
  {
    code: '350103001692F',
    designation: 'CONTROL PANEL WT12-C300/C310',
    division: 'DA04',
    alternatives: [
      {
        id: '1',
        description: 'ABS INJ + COLOR SUPPORT ABS BLANC / UNITE 02',
        validFrom: '2021-06-08',
        components: [
          { code: '450101000003', designation: 'ABS INJECTION', quantityPerUnit: 657.6, unit: 'G' },
          { code: '450101500003', designation: 'COLORANT ABS BLANC', quantityPerUnit: 27.4, unit: 'G' },
          { code: '450101000003D', designation: 'DECHET ABS', quantityPerUnit: -10, unit: 'G' },
          { code: '650301000392', designation: 'FILM ETIRABLE', quantityPerUnit: 1.585, unit: 'G' },
        ],
      },
      {
        id: '2',
        description: 'ABS ECO + COLOR SUPPORT GRIS / UNITE 05',
        validFrom: '2022-01-15',
        components: [
          { code: '450101000004', designation: 'ABS ECO RECYCLED', quantityPerUnit: 640.0, unit: 'G' },
          { code: '450101500004', designation: 'COLORANT ABS GRIS', quantityPerUnit: 32.0, unit: 'G' },
          { code: '450101000003D', designation: 'DECHET ABS', quantityPerUnit: -15, unit: 'G' },
        ],
      }
    ]
  },
  {
    code: '350110000986F',
    designation: 'FRONT TUB WF6-A10W',
    division: 'DA04',
    alternatives: [
      {
        id: '1',
        description: 'PP INJECTION COPO / CUVE AVANT',
        validFrom: '2020-03-22',
        components: [
          { code: '450101000054', designation: 'PP INJECTION COPO 45 MFI', quantityPerUnit: 1250.0, unit: 'G' },
          { code: '450101000054D', designation: 'DECHET PP', quantityPerUnit: -45, unit: 'G' },
        ],
      }
    ]
  },
  {
    code: '350103003178F',
    designation: 'Button Operation Plate (Control panel)',
    division: 'DA04',
    alternatives: [
      {
        id: '1',
        description: 'ABS BLACK MATT / FINITION NOIRE',
        validFrom: '2021-11-12',
        components: [
          { code: '450101000003', designation: 'ABS INJECTION', quantityPerUnit: 180.5, unit: 'G' },
          { code: '450101500008', designation: 'COLORANT NOIR', quantityPerUnit: 5.4, unit: 'G' },
        ],
      }
    ]
  }
];

export const INITIAL_PLANNING = {
  jan: 1250, feb: 1250, mar: 1250, apr: 1250,
  may: 1250, jun: 1250, jul: 1250, aug: 1250,
  sep: 1250, oct: 1250, nov: 1250, dec: 1250
};
