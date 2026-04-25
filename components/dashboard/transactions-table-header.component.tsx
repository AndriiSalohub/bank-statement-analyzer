import {
  TransactionFilterType,
  TransactionType,
} from '@/types/transaction.types';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';

interface TransactionsTableHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  transactionType: TransactionFilterType;
  onTransactionTypeChange: (transactionType: TransactionFilterType) => void;
  totalCount: number;
  filteredCount: number;
}

const TransactionsTableHeader: FC<TransactionsTableHeaderProps> = ({
  search,
  onSearchChange,
  transactionType,
  onTransactionTypeChange,
  totalCount,
  filteredCount,
}) => {
  return (
    <div className="flex justify-between mb-3">
      <div>
        <h2 className="text-xl font-semibold ">Transactions</h2>
        <p>
          Showing {filteredCount} of {totalCount} records
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by type or description..."
        />
        <ButtonGroup>
          {(
            [
              'All',
              TransactionType.INCOME,
              TransactionType.EXPENSE,
            ] as TransactionFilterType[]
          ).map((type) => (
            <Button
              key={type}
              onClick={() => onTransactionTypeChange(type)}
              variant={type === transactionType ? 'secondary' : 'default'}
            >
              {type === 'All'
                ? 'All'
                : type === TransactionType.INCOME
                  ? 'Income'
                  : 'Expenses'}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TransactionsTableHeader;
