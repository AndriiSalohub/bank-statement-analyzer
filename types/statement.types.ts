import { Transaction, TransactionParcingError } from './transaction.types';

export interface PaprseCSVProps {
  file: File;
  onSuccess: (data: Transaction[], skippedCount: number) => void;
  onError: (errors: TransactionParcingError[]) => void;
}
