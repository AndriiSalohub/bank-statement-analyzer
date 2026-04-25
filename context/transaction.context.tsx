import { calculateTransactionsSummary } from '@/lib/statement';
import { Transaction } from '@/types/transaction.types';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export const TransactionContext = createContext<ReturnType<
  typeof useTransactionsState
> | null>(null);

const useTransactionsState = () => {
  const [transactions, setTransations] = useState<Transaction[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = (newTransactions: Transaction[], file: File) => {
    setTransations((prevTransactions) => [
      ...prevTransactions,
      ...newTransactions,
    ]);
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleDeleteFile = (fileIndex: number) => {
    const fileToRemove = uploadedFiles[fileIndex];

    setTransations((prevTransactions) => [
      ...prevTransactions.filter(
        (transaction) => transaction.sourceFileName !== fileToRemove.name
      ),
    ]);

    setUploadedFiles((prev) => prev.filter((_, index) => index !== fileIndex));
  };

  const transactionsSummary = useMemo(
    () => calculateTransactionsSummary(transactions),
    [transactions]
  );

  return {
    transactions,
    uploadedFiles,
    handleFileUpload,
    handleDeleteFile,
    transactionsSummary,
    isLoading,
    setIsLoading,
  };
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error('useTransactions must be used with a TransactionContext');
  }

  return context;
};

export const TransactionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useTransactionsState();

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
