import { FC } from 'react';
import FileDeleteDialog from './file-delete-dialog.component';

interface FileItemProps {
  file: File;
  formatFileSize: (size: number) => string;
  onDelete: () => void;
}

const FileItem: FC<FileItemProps> = ({ file, formatFileSize, onDelete }) => {
  return (
    <li className="flex flex-col p-4 mt-4 bg-card border rounded-md shadow-sm animate-in fade-in duration-500">
      <div className="flex justify-between w-full items-center gap-4">
        <p className="text-sm font-semibold text-foreground truncate max-w-sm">
          {file.name}
        </p>
        <div className="flex gap-2 items-center">
          <p className="text-xs font-medium py-1 px-2 bg-muted text-muted-foreground w-fit rounded-lg shadow-sm">
            {formatFileSize(file.size)} MB
          </p>
          <FileDeleteDialog onDelete={onDelete} fileName={file.name} />
        </div>
      </div>
    </li>
  );
};

export default FileItem;
