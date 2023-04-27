import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      password: '123456',
      username: 'root',
      database: 'nestjs_amitav',
      port: configService.get('DB_PORT'),
      synchronize: true, // prod ko nen lam, vi se mat du lieu
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      logging: true,
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
