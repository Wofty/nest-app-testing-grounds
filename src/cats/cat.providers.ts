import { DataSource } from 'typeorm';
import { Cat } from './cat.entity';

export const catProviders = [
  {
    provide: 'CatRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cat),
    inject: ['DATA_SOURCE'],
  },
];
