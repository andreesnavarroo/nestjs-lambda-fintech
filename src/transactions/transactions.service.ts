import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.findAll();
  }

  async create(transactionData: CreateTransactionDto): Promise<Transaction> {
 
      return await this.transactionModel.create({
        ...transactionData,
        transaction_date: new Date(transactionData.transaction_date), // Convertir string a Date
      });

}
}