import { FC, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileItem from './file-item.component';
import DropZone from './drop-zone.component';
import { toast } from 'sonner';
import { Transaction } from '@/types/transaction.types';
import { parseCSV } from '@/lib/statement';

interface FileUploadProps {
  onDataLoaded?: (data: Transaction[], file: File) => void;
  onDelete: (fileIndex: number) => void;
  files: File[];
}

const FileUpload: FC<FileUploadProps> = ({ onDataLoaded, onDelete, files }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length === 0) {
      return;
    }

    const file = newFiles[0];

    const isSameFileExists = files.some(
      (uploadedFile) => uploadedFile.name === file.name
    );

    if (!isSameFileExists) {
      setIsLoading(true);

      parseCSV({
        file,
        onSuccess: (data, skipped) => {
          setIsLoading(false);
          onDataLoaded?.(data, file);

          if (skipped > 0) {
            toast.warning(`${skipped} rows skipped`);
          } else {
            toast.success('File successfully loaded');
          }
        },
        onError: (errors) => {
          setIsLoading(false);
          console.error('Errors:', errors);
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

      <DropZone isDragActive={isDragActive} onClick={handleClick} />

      {isLoading && <p>Analyzing file data...</p>}

      {files.length > 0 && (
        <ul className="space-y-3">
          {files.map((file, index) => (
            <FileItem
              key={file.name + index}
              file={file}
              formatFileSize={formatFileSize}
              onDelete={() => onDelete(index)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
