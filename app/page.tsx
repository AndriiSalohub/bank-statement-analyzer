'use client';

import SummaryCards from '@/components/dashboard/summary-cards.component';
import TopCounterparties from '@/components/dashboard/top-counterparties.component';
import TransactionsTable from '@/components/dashboard/transactions-table.component';
import FileUploadMotion from '@/components/file-upload/file-upload-card.component';
import { TransactionContextProvider } from '@/context/transaction.context';

const Home = () => {
  return (
    <TransactionContextProvider>
      <main className="p-6 space-y-6">
        <FileUploadMotion />
        <SummaryCards />
        <TopCounterparties />
        <TransactionsTable />
      </main>
    </TransactionContextProvider>
  );
};

export default Home;
