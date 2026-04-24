import { useEffect, useState } from 'react';
import FileUpload from './file-upload.component';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Transaction } from '@/types/transaction.types';
import { calculateTransactionsSummary } from '@/lib/statement';

const FileUploadMotion = () => {
  const [transactions, setTransations] = useState<Transaction[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (data: Transaction[], file: File) => {
    setTransations((prevTransactions) => [...prevTransactions, ...data]);
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

  useEffect(() => {
    console.log(transactions);
    console.log(calculateTransactionsSummary(transactions));
  }, [uploadedFiles, transactions]);

  return (
    <Card className="w-full max-w-4xl mx-auto mt-4 sm:mt-10 px-2 sm:px-4">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Upload file</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Only CSV files are supported. Drag & drop or click to upload.
        </CardDescription>
      </CardHeader>
      <FileUpload
        onDataLoaded={handleFileUpload}
        onDelete={handleDeleteFile}
        files={uploadedFiles}
      />
    </Card>
  );
};

export default FileUploadMotion;
