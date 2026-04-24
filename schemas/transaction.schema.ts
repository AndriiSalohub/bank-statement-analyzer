import z from 'zod';

export const TransactionSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  counterparty: z.string().min(1, 'Counterparty is required'),
  description: z.string().min(1, 'Description is required'),
  amount: z.preprocess((value) => Number(value), z.number()),
});
