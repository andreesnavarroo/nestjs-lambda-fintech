import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.model';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [SequelizeModule.forFeature([Transaction]), S3Module], // Conectar el modelo a Sequelize
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
