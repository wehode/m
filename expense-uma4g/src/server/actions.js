
import HttpError from '@wasp/core/HttpError.js'

export const createExpense = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const expense = await context.entities.Expense.create({
    data: {
      amount: args.amount,
      description: args.description,
      currency: args.currency,
      userId: context.user.id
    }
  });

  return expense;
}

export const createIncome = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  const { amount, description, currency } = args;

  const createdIncome = await context.entities.Income.create({
    data: {
      amount,
      description,
      currency,
      user: { connect: { id: context.user.id } }
    }
  });

  return createdIncome;
}

export const deleteExpense = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const expense = await context.entities.Expense.findUnique({
    where: { id: args.expenseId }
  });
  if (expense.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Expense.delete({
    where: { id: args.expenseId }
  });
}

export const deleteIncome = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const income = await context.entities.Income.findUnique({
    where: { id: args.incomeId }
  })

  if (income.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Income.delete({
    where: { id: args.incomeId }
  })
}
