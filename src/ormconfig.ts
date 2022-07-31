import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('POSTGRES_HOST'),
    username: config.get<string>('POSTGRES_USER'),
    password: config.get<string>('POSTGRES_PASSWORD'),
    database: config.get<string>('POSTGRES_DB'),
    port: config.get<number>('POSTGRES_PORT'),
    entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
    logging: true,
    migrationsRun: true,
    migrationsTableName: 'migration',
    migrations: [
      __dirname + '/migrations/**/*.ts',
      __dirname + '/migrations/**/*.js',
    ],
    cli: {
      migrationsDir: 'src/migrations',
    },
  })
} as TypeOrmModuleOptions;
