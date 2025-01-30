import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.model';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('all')
  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionsService.findAll();
  }

  @Post('create')
  async createTransaction(@Body() transactionData: Partial<Transaction>): Promise<Transaction> {
    return this.transactionsService.create(transactionData);
  }
}
