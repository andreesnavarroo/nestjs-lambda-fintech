import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.findAll();
  }

  async create(transactionData: Partial<Transaction>): Promise<Transaction> {
    return this.transactionModel.create(transactionData);
  }
}
