import { Transaction, TransactionParcingError } from './transaction.types';

export interface PaprseCSVProps {
  file: File;
  onSuccess: (data: Transaction[], skippedCount: number) => void;
  onError: (errors: TransactionParcingError[]) => void;
}

export interface TransactionsSummary {
  totalIncome: number;
  totalExpense: number;
  transactionsCount: number;
  netResult: number;
  topFiveCounterparties: {
    counterparty: string;
    amount: number;
  }[];
}
