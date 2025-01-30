import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.model';

@Module({
  imports: [SequelizeModule.forFeature([Transaction])], // Conectar el modelo a Sequelize
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
