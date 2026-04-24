import { TransactionSchema } from '@/schemas/transaction.schema';
import { PaprseCSVProps, TransactionsSummary } from '@/types/statement.types';
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
            data.amount > 0 ? TransactionType.INCOME : TransactionType.EXPENSE,
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

export const calculateTransactionsSummary = (
  transactions: Transaction[]
): TransactionsSummary => {
  const counterparties = new Map<string, number>();

  const transactionsSummary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === TransactionType.INCOME) {
        acc.totalIncome += transaction.amount;
      } else {
        const absAmount = Math.abs(transaction.amount);
        acc.totalExpense += absAmount;

        const currentAmount = counterparties.get(transaction.counterparty) || 0;
        counterparties.set(transaction.counterparty, currentAmount + absAmount);
      }

      return acc;
    },
    {
      totalIncome: 0,
      totalExpense: 0,
    }
  );

  const topFiveCounterparties = Array.from(
    counterparties,
    ([counterparty, amount]) => ({
      counterparty,
      amount,
    })
  )
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return {
    ...transactionsSummary,
    transactionsCount: transactions.length,
    netResult:
      transactionsSummary.totalIncome - transactionsSummary.totalExpense,
    topFiveCounterparties,
  };
};
