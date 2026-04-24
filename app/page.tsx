'use client';
import SummaryCards from '@/components/dashboard/summary-cards.component';
import FileUploadMotion from '@/components/file-upload/file-upload-card.component';
import { calculateTransactionsSummary } from '@/lib/statement';
import { Transaction } from '@/types/transaction.types';
import { useMemo, useState } from 'react';

const Home = () => {
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

  const { totalIncome, totalExpense, netResult, transactionsCount } = useMemo(
    () => calculateTransactionsSummary(transactions),
    [transactions]
  );

  return (
    <main className="p-6 space-y-6">
      <FileUploadMotion
        uploadedFiles={uploadedFiles}
        onDataLoaded={handleFileUpload}
        onDelete={handleDeleteFile}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <SummaryCards
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        transactionsCount={transactionsCount}
        netResult={netResult}
        isLoading={isLoading}
      />
    </main>
  );
};

export default Home;
