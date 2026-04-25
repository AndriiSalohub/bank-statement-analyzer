import { TransactionSchema } from '@/schemas/transaction.schema';
import z from 'zod';

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export type Transaction = z.infer<typeof TransactionSchema> & {
  type: TransactionType;
  sourceFileName: string;
};

export interface TransactionParcingError {
  sourceFileName: string;
  row?: number;
  message: string;
}

export type TransactionFilterType = 'All' | TransactionType;
