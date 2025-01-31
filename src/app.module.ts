import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionsModule } from './transactions/transactions.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        autoLoadModels: true,
        synchronize: false,
        logging: process.env.NODE_ENV === 'development', // ✅ Desactiva logs en producción
        pool: {
          max: 5, // ✅ Límite de conexiones para evitar problemas en Serverless
          min: 0,
          idle: 10000,
        },
      }),
    }),

    TransactionsModule,
    S3Module,
  ],
  providers: [],
})
export class AppModule {}
