import { useTransactions } from '@/context/transaction.context';

const TopCounterparties = () => {
  const { transactionsSummary, isLoading } = useTransactions();
  const { topFiveCounterparties } = transactionsSummary;

  const isEmpty = topFiveCounterparties.length === 0;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Top Counterparties</h2>
      <ul className="bg-card border w-full rounded-md shadow-sm p-4">
        {isLoading ? (
          <p>Loading counterparties...</p>
        ) : isEmpty ? (
          <p>No counterparties found</p>
        ) : (
          topFiveCounterparties.map((topCounterparty) => (
            <li
              key={topCounterparty.counterparty}
              className="flex flex-col p-4 mt-4 bg-card border rounded-md shadow-sm animate-in fade-in duration-500"
            >
              <div className="flex justify-between w-full items-center gap-4">
                <p className="text-lg font-semibold text-foreground truncate max-w-sm">
                  {topCounterparty.counterparty}
                </p>
                <p className="font-medium text-md">-{topCounterparty.amount}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default TopCounterparties;
