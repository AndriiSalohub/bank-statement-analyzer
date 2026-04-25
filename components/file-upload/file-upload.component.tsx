import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileItem from './file-item.component';
import DropZone from './drop-zone.component';
import { toast } from 'sonner';
import { TransactionParcingError } from '@/types/transaction.types';
import { parseCSV } from '@/lib/statement';
import { useTransactions } from '@/context/transaction.context';

const FileUpload = () => {
  const {
    uploadedFiles,
    handleFileUpload,
    handleDeleteFile,
    isLoading,
    setIsLoading,
  } = useTransactions();

  const [skippedRows, setSkippedRows] = useState<number>(0);
  const [errors, setErrors] = useState<TransactionParcingError[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length === 0) {
      return;
    }

    const file = newFiles[0];

    const isSameFileExists = uploadedFiles.some(
      (uploadedFile) => uploadedFile.name === file.name
    );

    if (!isSameFileExists) {
      setIsLoading(true);

      parseCSV({
        file,
        onSuccess: (data, skipped) => {
          setIsLoading(false);
          handleFileUpload(data, file);

          if (skipped > 0) {
            setSkippedRows(skipped);
            toast.warning(`${skipped} rows skipped`);
          } else {
            toast.success('File successfully loaded');
          }
        },
        onError: (errors) => {
          setIsLoading(false);
          setErrors(errors);
        },
      });
    } else {
      toast.error('A file with that name has already been uploaded', {
        description: 'Please choose another file or delete the previous one.',
      });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    accept: {
      'text/csv': ['.csv'],
    },
    onDropRejected: () => {
      toast.error(
        'Please upload only CSV files and only one file can be uploaded at a time.'
      );
    },
  });

  const formatFileSize = (size: number) => (size / (1024 * 1024)).toFixed(2);

  return (
    <div className="w-full space-y-3" {...getRootProps()}>
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
        accept=".csv"
        className="hidden"
      />

      <DropZone
        isDragActive={isDragActive}
        onClick={handleClick}
        disabled={isLoading}
      />

      {isLoading && <p>Analyzing file data...</p>}

      {uploadedFiles.length > 0 && (
        <ul className="space-y-3">
          {uploadedFiles.map((file, index) => (
            <FileItem
              key={file.name + index}
              file={file}
              formatFileSize={formatFileSize}
              onDelete={() => handleDeleteFile(index)}
              skipped={skippedRows}
              errors={errors}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
