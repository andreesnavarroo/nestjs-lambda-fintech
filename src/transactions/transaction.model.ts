import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'transactions', timestamps: true })
export class Transaction extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  transaction_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  customer_name: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount: number;

  @Column({
    type: DataType.ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT'),
    allowNull: false,
  })
  transaction_type: string;

  @Column({
    type: DataType.ENUM('COMPLETED', 'PENDING', 'FAILED'),
    allowNull: false,
  })
  status: string;

  @Column({ type: DataType.DATE, allowNull: false })
  transaction_date: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  updatedAt: Date;
}
