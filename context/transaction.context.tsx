import { TransactionsSummary } from '@/types/statement.types';
import { Transaction } from '@/types/transaction.types';
import { createContext, useContext } from 'react';

interface TransactionContextType {
  transactions: Transaction[];
  uploadedFiles: File[];
  handleFileUpload: (newTransactions: Transaction[], file: File) => void;
  handleDeleteFile: (fileIndex: number) => void;
  transactionsSummary: TransactionsSummary;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const TransactionContext = createContext<TransactionContextType | null>(
  null
);

export const useTransactions = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error('useTransactions must be used with a TransactionContext');
  }

  return context;
};
