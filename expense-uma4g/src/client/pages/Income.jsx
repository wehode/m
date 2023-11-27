import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import createIncome from '@wasp/actions/createIncome';
import deleteIncome from '@wasp/actions/deleteIncome';
import getUserIncomes from '@wasp/queries/getUserIncomes';

export function Income() {
  const { data: incomes, isLoading, error } = useQuery(getUserIncomes, { userId: 1 });
  const createIncomeFn = useAction(createIncome);
  const deleteIncomeFn = useAction(deleteIncome);
  const [newIncomeAmount, setNewIncomeAmount] = useState(0);
  const [newIncomeDescription, setNewIncomeDescription] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateIncome = () => {
    createIncomeFn({
      amount: newIncomeAmount,
      description: newIncomeDescription,
      currency: 'USD'
    });
    setNewIncomeAmount(0);
    setNewIncomeDescription('');
  };

  const handleDeleteIncome = (incomeId) => {
    deleteIncomeFn({ incomeId });
  };

  return (
    <div className=''>
      <div className='flex gap-x-4 py-5'>
        <input
          type='number'
          placeholder='Amount'
          className='px-1 py-2 border rounded text-lg'
          value={newIncomeAmount}
          onChange={(e) => setNewIncomeAmount(Number(e.target.value))}
        />
        <input
          type='text'
          placeholder='Description'
          className='px-1 py-2 border rounded text-lg'
          value={newIncomeDescription}
          onChange={(e) => setNewIncomeDescription(e.target.value)}
        />
        <button
          onClick={handleCreateIncome}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Income
        </button>
      </div>
      <div>
        {incomes.map((income) => (
          <div
            key={income.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <button
              onClick={() => handleDeleteIncome(income.id)}
              className='px-2 py-2 bg-red-500 text-white font-bold rounded'
            >
              Delete
            </button>
            <p>{income.amount} {income.currency} - {income.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}