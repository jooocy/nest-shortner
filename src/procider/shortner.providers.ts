import { DataSource } from 'typeorm';
import { Shortner } from '../entity/shortner.entity';
export const shortnerProviders = [
  {
    provide: 'SHORTNER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Shortner),
    inject: ['DATA_SOURCE'],
  },
];
