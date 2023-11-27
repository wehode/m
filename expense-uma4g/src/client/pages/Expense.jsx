import React from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import createExpense from '@wasp/actions/createExpense';
import deleteExpense from '@wasp/actions/deleteExpense';
import getUserExpenses from '@wasp/queries/getUserExpenses';

export function Expense() {
  const { data: expenses, isLoading, error } = useQuery(getUserExpenses, { userId: 1 });
  const deleteExpenseFn = useAction(deleteExpense);

  const handleDeleteExpense = (expenseId) => {
    deleteExpenseFn({ expenseId });
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
        >
          <p>{expense.description}</p>
          <button onClick={() => handleDeleteExpense(expense.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}