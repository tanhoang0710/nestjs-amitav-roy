import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get('DB_HOST'),
      password: configService.get('DB_PASSWORD'),
      username: configService.get('DB_USERNAME'),
      database: configService.get('DB_NAME'),
      port: configService.get('DB_PORT'),
      synchronize: true, // prod ko nen lam, vi se mat du lieu
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // logging: true,
      charset: 'utf8mb4_unicode_ci',
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    };
  }
}
export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_USERNAME, 10),
  synchronize: true, // prod ko nen lam, vi se mat du lieu
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // logging: true,
  charset: 'utf8mb4_unicode_ci',
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
};
