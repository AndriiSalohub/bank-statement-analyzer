import { calculateTransactionsSummary } from '@/lib/statement';
import { Transaction, TransactionType } from '@/types/transaction.types';
import { describe, expect, test } from 'vitest';

describe('calculateTransactionsSummary', () => {
  const mockTransactions = [
    {
      date: '2025-01-15',
      counterparty: 'ТОВ "Альфа"',
      description: 'Оплата за послуги',
      amount: 15000.0,
      type: TransactionType.INCOME,
    },
    {
      date: '2025-01-16',
      counterparty: 'ФОП Петренко',
      description: 'Повернення депозиту',
      amount: -5000.0,
      type: TransactionType.EXPENSE,
    },
    {
      date: '2025-01-18',
      counterparty: 'Сільпо',
      description: 'Канцтовари',
      amount: -1250.5,
      type: TransactionType.EXPENSE,
    },
  ] as Transaction[];

  test('should correctly calculate transactions summary', () => {
    const results = calculateTransactionsSummary(mockTransactions);

    expect(results.totalIncome).toBe(15000.0);
    expect(results.totalExpense).toBe(6250.5);
    expect(results.transactionsCount).toBe(3);
    expect(results.netResult).toBe(8749.5);
    expect(results.topFiveCounterparties).toHaveLength(2);
    expect(results.topFiveCounterparties[0].counterparty).toBe('ФОП Петренко');
    expect(results.topFiveCounterparties[0].amount).toBe(5000.0);
  });
});
