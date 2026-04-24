import { FC, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FileItem from './file-item.component';
import DropZone from './drop-zone.component';
import { toast } from 'sonner';

interface FileUploadProps {
  onChange?: (files: File[]) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onChange }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const handleFileDelete = (fileIndex: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== fileIndex));
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
      toast.error('Please upload only CSV files.');
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
      {files.length > 0 && (
        <ul className="space-y-3">
          {files.map((file, index) => (
            <FileItem
              key={file.name + index}
              file={file}
              formatFileSize={formatFileSize}
              onDelete={() => handleFileDelete(index)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
