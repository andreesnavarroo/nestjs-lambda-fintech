import { IsNotEmpty, IsNumber, IsPositive, IsEnum, IsDateString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'Customer name is required' })
  customer_name: string;

  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be greater than 0' })
  amount: number;

  @IsEnum(['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT'], { message: 'Invalid transaction type' })
  transaction_type: string;

  @IsEnum(['COMPLETED', 'PENDING', 'FAILED'], { message: 'Invalid status' })
  status: string;

  @IsDateString({}, { message: 'Transaction date must be a valid date' })
  transaction_date: string;
}
