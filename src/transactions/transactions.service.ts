import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { S3Service } from '../s3/s3.service';
import { Readable } from 'stream';
import { parse } from 'csv-parse';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
    private readonly s3Service: S3Service,

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

async processCsvFromS3(fileName: string): Promise<string> {
  try {
    const fileKey = `transactions/${fileName}`;

    const fileStream: Readable = await this.s3Service.getFileStream(fileKey);

    return new Promise((resolve, reject) => {

      const parser = fileStream.pipe(parse({ columns: true, trim: true }));

      parser.on('data', async (row) => {
        try {
          const transaction = {
            customer_name: row.customer_name,
            amount: parseFloat(row.amount),
            transaction_type: row.transaction_type.toUpperCase(),
            status: row.status.toUpperCase(),
            transaction_date: new Date(row.transaction_date),
            description: row.description || null,
          };

          await this.transactionModel.create(transaction); //  Guardamos en la base de datos
        } catch (error) {
          console.error('Error al procesar la fila:', row, error);
        }
      });

      parser.on('end', () => resolve(`Transacción existosa.`));
      parser.on('error', (error) => {
        reject(new Error(error?.message || 'Error al procesar el archivo CSV.'));
      });
    });
  } catch (error) {
    console.error('Error al procesar el archivo CSV desde S3:', error);
    throw new BadRequestException('No se pudo procesar el archivo CSV desde S3.');
  }
}

}

