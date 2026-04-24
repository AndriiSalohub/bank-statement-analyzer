import { FC } from 'react';
import FileUpload from './file-upload.component';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Transaction } from '@/types/transaction.types';

interface FileUploadMotionProps {
  uploadedFiles: File[];
  onDataLoaded: (newTransactions: Transaction[], file: File) => void;
  onDelete: (fileIndex: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const FileUploadMotion: FC<FileUploadMotionProps> = ({
  uploadedFiles,
  onDataLoaded,
  onDelete,
  isLoading,
  setIsLoading,
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto mt-4 sm:mt-10 px-2 sm:px-4">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Upload file</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Only CSV files are supported. Drag & drop or click to upload.
        </CardDescription>
      </CardHeader>
      <FileUpload
        onDataLoaded={onDataLoaded}
        onDelete={onDelete}
        files={uploadedFiles}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </Card>
  );
};

export default FileUploadMotion;
