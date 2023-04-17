import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  password: '123456',
  username: 'root',
  database: 'nestjs_amitav',
  port: 3306,
  synchronize: true, // prod ko nen lam, vi se mat du lieu
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
