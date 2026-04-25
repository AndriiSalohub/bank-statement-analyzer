import { TransactionContext } from '@/context/transaction.context';
import { calculateTransactionsSummary } from '@/lib/statement';
import { Transaction } from '@/types/transaction.types';
import { FC, ReactNode, useMemo, useState } from 'react';

interface TransactionProviderProps {
  children: ReactNode;
}

const TransactionProvider: FC<TransactionProviderProps> = ({ children }) => {
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

  const value = {
    transactions,
    uploadedFiles,
    handleFileUpload,
    handleDeleteFile,
    transactionsSummary,
    isLoading,
    setIsLoading,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
