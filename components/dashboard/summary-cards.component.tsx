import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  HandCoins,
  Landmark,
} from 'lucide-react';
import { useTransactions } from '@/context/transaction.context';

const SummaryCards = () => {
  const { isLoading, transactionsSummary } = useTransactions();
  const { totalIncome, totalExpense, netResult, transactionsCount } =
    transactionsSummary;

  const netColor = netResult > 0 ? 'text-green-600' : 'text-red-600';

  const cards = [
    {
      title: 'Total Income',
      value: totalIncome.toFixed(2),
      icon: BanknoteArrowUp,
      color: 'text-green-600',
    },
    {
      title: 'Total Expense',
      value: totalExpense.toFixed(2),
      icon: BanknoteArrowDown,
      color: 'text-red-600',
    },
    {
      title: 'Total Net',
      value: netResult.toFixed(2),
      icon: HandCoins,
      color: netColor,
    },
    {
      title: 'Transactions Count',
      value: transactionsCount,
      icon: Landmark,
      color: 'text-blue-600',
    },
  ];

  return (
    <section
      className={cn(
        'grid gap-4 md:grid-cols-2 lg:grid-cols-4',
        isLoading && 'animate-pulse opacity/50'
      )}
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                {card.title}
              </CardTitle>
              <Icon className={card.color} />
            </CardHeader>
            <CardContent>
              <p className={cn('text-xl font-semibold', card.color)}>
                {card.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default SummaryCards;
