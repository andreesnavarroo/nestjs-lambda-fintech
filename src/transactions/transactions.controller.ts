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
import { CreateTransactionDto, UploadFileDto } from './dto/create-transaction.dto';

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

  
  @Post('import')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async importTransactions(@Body() uploadFileDto: UploadFileDto) {
    return this.transactionsService.processCsvFromS3(uploadFileDto.fileKey);
  }
}