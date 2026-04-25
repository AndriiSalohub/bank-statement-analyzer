import { calculateTransactionsSummary } from '@/lib/statement';
import { Transaction } from '@/types/transaction.types';
import { useMemo, useState } from 'react';

export const useTransactions = () => {
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
    uploadedFiles,
    isLoading,
    setIsLoading,
    transactionsSummary,
    handleFileUpload,
    handleDeleteFile,
  };
};
