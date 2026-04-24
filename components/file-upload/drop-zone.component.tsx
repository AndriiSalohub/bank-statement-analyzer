import { cn } from '@/lib/utils';
import { CloudUpload } from 'lucide-react';
import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface DropZoneProps {
  isDragActive: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const DropZone: FC<DropZoneProps> = ({
  isDragActive,
  onClick,
  disabled = false,
}) => (
  <div
    onClick={onClick}
    className={cn(
      'relative cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 flex flex-col items-center justify-center gap-4 text-center transition-all duration-200 ease-in-out',
      isDragActive
        ? 'border-primary bg-primary/5 scale-[1.01]'
        : 'border-border hover:border-primary/60 hover:bg-muted/40'
    )}
  >
    <div
      className={cn(
        'flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed transition-colors',
        isDragActive
          ? 'border-primary text-primary'
          : 'border-border text-muted-foreground'
      )}
    >
      <CloudUpload size={24} />
    </div>

    <div className="space-y-1">
      <p className="text-sm font-medium text-foreground">
        {isDragActive ? 'Drop the file here' : 'Drag & drop your file here'}
      </p>
      <p className="text-xs text-muted-foreground">or select it manually</p>
    </div>

    <Button
      type="button"
      variant="outline"
      className="mt-1"
      disabled={disabled}
    >
      Browse File
    </Button>
  </div>
);

export default DropZone;
