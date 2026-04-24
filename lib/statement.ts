import { TransactionSchema } from '@/schemas/transaction.schema';
import { PaprseCSVProps } from '@/types/statement.types';
import {
  Transaction,
  TransactionType,
  TransactionParcingError,
} from '@/types/transaction.types';
import Papa from 'papaparse';

export const parseCSV = ({ file, onSuccess, onError }: PaprseCSVProps) => {
  const parsedResults: Transaction[] = [];
  const errors: TransactionParcingError[] = [];
  let skippedCount: number = 0;

  Papa.parse(file, {
    header: true,
    step: (results) => {
      const validation = TransactionSchema.safeParse(results.data);
      if (validation.success) {
        const data = validation.data;

        parsedResults.push({
          ...data,
          type:
            data.amount > 0 ? TransactionType.INCOME : TransactionType.INCOME,
          sourceFileName: file.name,
        });
      } else {
        skippedCount++;
        errors.push({
          row: results.errors[0].row,
          message: validation.error.message,
        });
      }
    },
    complete: () => {
      onSuccess(parsedResults, skippedCount);

      if (errors.length > 0) {
        onError(errors);
      }
    },
  });
};
