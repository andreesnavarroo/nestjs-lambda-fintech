import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION_ ?? 'us-east-1',
    });
  }

    /**
   * Obtiene un flujo de lectura (`Readable`) de un archivo almacenado en un bucket de S3.
   * @param {string} fileKey - La clave del archivo dentro del bucket de S3.
   * @returns {Promise<Readable>} Un flujo de lectura del archivo solicitado.
   * @throws {InternalServerErrorException} Si hay un error al recuperar el archivo o el stream no es válido.
   */
  async getFileStream(fileKey: string): Promise<Readable> {
    try {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
      };
      const command = new GetObjectCommand(params);
      const { Body } = await this.s3.send(command);

      if (!(Body instanceof Readable)) {
        throw new InternalServerErrorException(
          'Invalid file stream received from S3',
        );
      }

      return Body;
    } catch (error) {
      console.error('Error fetching file from S3:', error);
      throw new InternalServerErrorException('Failed to retrieve file from S3');
    }
  }
  }
