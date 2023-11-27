import React from 'react';
import { Chart } from 'react-google-charts';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserIncomes from '@wasp/queries/getUserIncomes';
import getUserExpenses from '@wasp/queries/getUserExpenses';
import createIncome from '@wasp/actions/createIncome';
import createExpense from '@wasp/actions/createExpense';
import deleteIncome from '@wasp/actions/deleteIncome';
import deleteExpense from '@wasp/actions/deleteExpense';

export function Dashboard() {
  const { data: incomes } = useQuery(getUserIncomes);
  const { data: expenses } = useQuery(getUserExpenses);

  const totalIncome = incomes?.reduce((sum, income) => sum + income.amount, 0) || 0;
  const totalExpense = expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
  const balance = totalIncome - totalExpense;
  const percentToTarget = Math.round((balance / 5000) * 100);

  const handleDeleteIncome = (incomeId) => {
    deleteIncome({ incomeId });
  };

  const handleDeleteExpense = (expenseId) => {
    deleteExpense({ expenseId });
  };

  const handleCreateIncome = () => {
    const amount = Math.floor(Math.random() * 100) + 1;
    const description = `Income ${Math.floor(Math.random() * 10) + 1}`;
    const currency = 'USD';
    createIncome({ amount, description, currency });
  };

  const handleCreateExpense = () => {
    const amount = Math.floor(Math.random() * 100) + 1;
    const description = `Expense ${Math.floor(Math.random() * 10) + 1}`;
    const currency = 'USD';
    createExpense({ amount, description, currency });
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <h2>Balance</h2>
        <p>Total Income: {totalIncome}</p>
        <p>Total Expense: {totalExpense}</p>
        <p>Balance: {balance}</p>
        <p>Percent to Target: {percentToTarget}%</p>
      </div>

      <div>
        <h2>Chart</h2>
        <Chart
          chartType='ColumnChart'
          data={[
            ['Category', 'Amount'],
            ['Incomes', totalIncome],
            ['Expenses', totalExpense]
          ]}
          options={{
            title: 'Income and Expense Balance',
            hAxis: { title: 'Category' },
            vAxis: { title: 'Amount' }
          }}
          width='100%'
          height='400px'
        />
      </div>

      <div>
        <h2>Incomes</h2>
        {incomes?.map((income) => (
          <div key={income.id}>
            <p>{income.amount} - {income.description}</p>
            <button onClick={() => handleDeleteIncome(income.id)}>Delete</button>
          </div>
        ))}
        <button onClick={handleCreateIncome}>Create Income</button>
      </div>

      <div>
        <h2>Expenses</h2>
        {expenses?.map((expense) => (
          <div key={expense.id}>
            <p>{expense.amount} - {expense.description}</p>
            <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
          </div>
        ))}
        <button onClick={handleCreateExpense}>Create Expense</button>
      </div>

      <div>
        <Link to='/income'>Go to Income Page</Link>
      </div>

      <div>
        <Link to='/expense'>Go to Expense Page</Link>
      </div>
    </div>
  );
}