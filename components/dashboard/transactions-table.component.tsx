import {
  TransactionFilterType,
  TransactionType,
} from '@/types/transaction.types';
import { FC, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { useTransactions } from '@/context/transaction.context';
import { useDebounce } from '@/hooks/use-debounce.hook';
import TransactionsTableHeader from './transactions-table-header.component';
import TransactionsPagiation from './transactions-pagination.component';

interface TransactionsTableProps {
  pageSize?: number;
}

const TransactionsTable: FC<TransactionsTableProps> = ({ pageSize = 15 }) => {
  const { transactions, isLoading } = useTransactions();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transactionType, setTransactionType] =
    useState<TransactionFilterType>('All');
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchTransactionTypeFilter =
      transactionType === 'All' || transaction.type === transactionType;

    const matchSearch =
      transaction.counterparty.toLowerCase().includes(debouncedSearch) ||
      transaction.description.toLowerCase().includes(debouncedSearch);

    return matchTransactionTypeFilter && matchSearch;
  });

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const pageRows = filteredTransactions.slice(start, start + pageSize);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleTransactionTypeChange = (value: TransactionFilterType) => {
    setTransactionType(value);
    setCurrentPage(1);
  };

  return (
    <section className="space-y-3">
      <TransactionsTableHeader
        search={search}
        onSearchChange={handleSearchChange}
        transactionType={transactionType}
        onTransactionTypeChange={handleTransactionTypeChange}
        totalCount={transactions.length}
        filteredCount={filteredTransactions.length}
      />

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
        <TransactionsPagiation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default TransactionsTable;
