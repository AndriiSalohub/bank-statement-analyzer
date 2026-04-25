import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getPageNumbers } from '@/lib/pagination';

interface TransactionsPagiationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TransactionsPagiation: FC<TransactionsPagiationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-center mb-3">
      <div className="flex items-center gap-1">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {getPageNumbers(currentPage, totalPages).map((page, index) => (
          <Button
            key={index}
            variant={currentPage === page ? 'secondary' : 'outline'}
            disabled={page === '...'}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={cn(page === '...' && 'border-none')}
          >
            {page}
          </Button>
        ))}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TransactionsPagiation;
