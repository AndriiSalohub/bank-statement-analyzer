'use client';

import SummaryCards from '@/components/dashboard/summary-cards.component';
import TopCounterparties from '@/components/dashboard/top-counterparties.component';
import TransactionsTable from '@/components/dashboard/transactions-table.component';
import FileUploadCard from '@/components/file-upload/file-upload-card.component';
import TransactionProvider from '@/components/providers/transaction-provider.component';

const Home = () => {
  return (
    <TransactionProvider>
      <main className="p-6 space-y-6">
        <FileUploadCard />
        <SummaryCards />
        <TopCounterparties />
        <TransactionsTable />
      </main>
    </TransactionProvider>
  );
};

export default Home;
