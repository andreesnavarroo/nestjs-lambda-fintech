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

  /**
   * Obtiene todas las transacciones almacenadas en la base de datos.
   * @returns {Promise<Transaction[]>} Lista de transacciones.
   */
  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.findAll();
  }

  /**
   * Crea una nueva transacción en la base de datos.
   * @param {CreateTransactionDto} transactionData - Datos de la transacción a crear.
   * @returns {Promise<Transaction>} La transacción creada.
   */
  async create(transactionData: CreateTransactionDto): Promise<Transaction> {
    return await this.transactionModel.create({
      ...transactionData,
      transaction_date: new Date(transactionData.transaction_date), // Convertir string a Date
    });
  }

  /**
   * Procesa un archivo CSV almacenado en S3, parsea su contenido y almacena cada fila en la base de datos.
   * @param {string} fileName - Nombre del archivo en S3.
   * @returns {Promise<string>} Mensaje de éxito o error.
   */
  async processCsvFromS3(fileName: string): Promise<string> {
    try {
      // Construir la clave del archivo en S3
      const fileKey = `transactions/${fileName}`;

      // Obtener el flujo de datos del archivo desde S3
      const fileStream: Readable = await this.s3Service.getFileStream(fileKey);

      return await new Promise<string>((resolve, reject) => {
        // Parsear el CSV con encabezados como columnas y eliminando espacios en blanco
        const parser = fileStream.pipe(parse({ columns: true, trim: true }));

        // Procesar cada fila del CSV
        parser.on('data', (row: Record<string, string>) => {
          void (async () => {
            try {
              // Convertir los datos del CSV a un formato compatible con el modelo Transaction
              const transaction = {
                customer_name: String(row.customer_name),
                amount: parseFloat(row.amount),
                transaction_type: String(row.transaction_type).toUpperCase(),
                status: String(row.status).toUpperCase(),
                transaction_date: new Date(row.transaction_date),
                description: row.description ? String(row.description) : null,
              };

              // Guardar la transacción en la base de datos
              await this.transactionModel.create(transaction);
            } catch (error) {
              console.error('Error al procesar la fila:', row, error);
            }
          })(); // Función autoejecutable para manejar cada fila de forma asíncrona
        });

        // Resolver la promesa cuando termine de procesar el archivo
        parser.on('end', () => resolve('Su transacción ha sido procesada exitosamente.'));

        // Manejo de errores en el parsing del CSV
        parser.on('error', (error) =>
          reject(
            new Error(error?.message || 'Error al procesar el archivo CSV.'),
          ),
        );
      });
    } catch (error) {
      console.error('Error al procesar el archivo CSV desde S3:', error);
      throw new BadRequestException(
        'No se pudo procesar el archivo CSV desde S3.',
      );
    }
  }
}
