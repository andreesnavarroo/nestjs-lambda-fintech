import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
// import { TransactionsModule } from './transactions/transactions.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carga automáticamente las variables de .env
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: false, // Usaremos migraciones
    }), TransactionsModule,
    // TransactionsModule, // Importar el módulo de transacciones
  ],
})
export class AppModule {}
