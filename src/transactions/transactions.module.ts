import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.model';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Transaction]), // ✅ Conectar el modelo a Sequelize
    S3Module,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService], // ✅ Asegurar que está aquí
  exports: [TransactionsService], // ✅ Exportar para que otros módulos lo puedan usar
})
export class TransactionsModule {}
