import { FC } from 'react';
import FileDeleteDialog from './file-delete-dialog.component';
import { TransactionParcingError } from '@/types/transaction.types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { formatZodError } from '@/lib/formatter';

interface FileItemProps {
  file: File;
  formatFileSize: (size: number) => string;
  onDelete: () => void;
  skipped: number;
  errors: TransactionParcingError[];
}

const FileItem: FC<FileItemProps> = ({
  file,
  formatFileSize,
  onDelete,
  skipped,
  errors,
}) => {
  return (
    <li className="flex flex-col p-4 mt-4 bg-card border rounded-md shadow-sm animate-in fade-in duration-500">
      <div className="flex justify-between w-full items-center gap-4">
        <p className="text-sm font-semibold text-foreground truncate max-w-sm">
          {file.name}
        </p>
        <div className="flex gap-2 items-center">
          {skipped > 0 && (
            <p className="text-xs font-medium py-1 px-2 bg-muted text-muted-foreground w-fit rounded-lg shadow-sm">
              {skipped} rows skipped
            </p>
          )}
          <p className="text-xs font-medium py-1 px-2 bg-muted text-muted-foreground w-fit rounded-lg shadow-sm">
            {formatFileSize(file.size)} MB
          </p>
          <FileDeleteDialog onDelete={onDelete} fileName={file.name} />
        </div>
      </div>

      {errors.length > 0 && (
        <Accordion>
          <AccordionItem>
            <AccordionTrigger className="cursor-pointer text-base">
              Show errors
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                {errors.map((error, index) => (
                  <li
                    key={index}
                    className="text-sm text-destructive bg-destructive/10 p-2 rounded-md"
                  >
                    <span className="font-medium">Row: {error.row}</span>
                    <ul className="mt-1 pl-2 space-y-1">
                      {formatZodError(error.message).map((message) => (
                        <li key={message}>- {message}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </li>
  );
};

export default FileItem;
