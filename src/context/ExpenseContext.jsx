import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const getFilteredExpenses = (category, startDate, endDate) => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const matchesCategory = category ? expense.category === category : true;
      const matchesStartDate = startDate
        ? expenseDate >= new Date(startDate)
        : true;
      const matchesEndDate = endDate ? expenseDate <= new Date(endDate) : true;

      return matchesCategory && matchesStartDate && matchesEndDate;
    });
  };

  const getTotalExpenses = (filteredExpenses = expenses) => {
    return filteredExpenses.reduce(
      (total, expense) => total + parseFloat(expense.amount),
      0
    );
  };

  const getCategoryTotals = () => {
    const categories = {};
    expenses.forEach((expense) => {
      if (categories[expense.category]) {
        categories[expense.category] += parseFloat(expense.amount);
      } else {
        categories[expense.category] = parseFloat(expense.amount);
      }
    });
    return categories;
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        getFilteredExpenses,
        getTotalExpenses,
        getCategoryTotals,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
