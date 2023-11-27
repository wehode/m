import HttpError from '@wasp/core/HttpError.js'

export const getUserIncomes = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const incomes = await context.entities.Income.findMany({
    where: { userId }
  });

  return incomes;
}

export const getUserExpenses = async ({ userId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Expense.findMany({
    where: { userId }
  });
}
