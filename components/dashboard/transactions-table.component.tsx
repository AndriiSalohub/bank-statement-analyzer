import { Transaction, TransactionType } from '@/types/transaction.types';
import { FC, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getPageNumbers } from '@/lib/pagination';

interface TransactionsTableProps {
  transactions: Transaction[];
  pageSize?: number;
  isLoading: boolean;
}

const TransactionsTable: FC<TransactionsTableProps> = ({
  transactions,
  pageSize = 15,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(transactions.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const pageRows = transactions.slice(start, start + pageSize);

  return (
    <section className="space-y-3">
      <div className="mb-3">
        <h2 className="text-xl font-semibold ">Transactions</h2>
        <p>{transactions.length} records</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Counterparty</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amout</TableHead>
            <TableHead className="text-right">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5}>Loading transactions...</TableCell>
            </TableRow>
          ) : pageRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>No transactions found</TableCell>
            </TableRow>
          ) : (
            pageRows.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.counterparty}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className="text-right">
                  {transaction.amount}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      'px-2 py-1 font-medium rounded-lg shadow-sm',
                      transaction.type === TransactionType.INCOME
                        ? 'text-green-600 bg-green-600/10'
                        : 'text-destructive bg-destructive/10'
                    )}
                  >
                    {transaction.type === TransactionType.INCOME
                      ? 'Income'
                      : 'Expenses'}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex items-center gap-1">
            <Button
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {getPageNumbers(currentPage, totalPages).map((page, index) => (
              <Button
                key={index}
                variant={currentPage === page ? 'secondary' : 'outline'}
                disabled={page === '...'}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                className={cn(page === '...' && 'border-none')}
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TransactionsTable;
