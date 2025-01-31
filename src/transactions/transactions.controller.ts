import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {
    console.log('🚀 TransactionsController inicializado.');
    console.log(
      '🔍 TransactionsService:',
      this.transactionsService ? 'Disponible' : 'NO DISPONIBLE',
    );
  }

  @Get('all')
  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionsService.findAll();
  }

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createTransaction(
    @Body() transactionData: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.create(transactionData);
  }

  @Post('import/:fileKey')
  async importTransactions(@Param('fileKey') fileKey: string) {
    console.log('✅ Endpoint /import llamado con fileKey:', fileKey);
    console.log(
      '🔍 TransactionsService dentro de método:',
      this.transactionsService ? 'Disponible' : 'NO DISPONIBLE',
    );

    return this.transactionsService.processCsvFromS3(fileKey);
  }
}
