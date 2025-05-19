import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { format } from "date-fns";

const Summary = () => {
  const { expenses, getTotalExpenses, getCategoryTotals } =
    useContext(ExpenseContext);

  const totalExpenses = getTotalExpenses();
  const categoryTotals = getCategoryTotals();

  // Calculate average expense
  const averageExpense =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;

  // Find most expensive category
  let mostExpensiveCategory = "N/A";
  let maxAmount = 0;

  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > maxAmount) {
      maxAmount = amount;
      mostExpensiveCategory = category;
    }
  });

  // Get earliest and latest expense dates
  let earliestDate = "N/A";
  let latestDate = "N/A";

  if (expenses.length > 0) {
    const dates = expenses.map((expense) => new Date(expense.date));
    earliestDate = format(new Date(Math.min(...dates)), "MMM dd, yyyy");
    latestDate = format(new Date(Math.max(...dates)), "MMM dd, yyyy");
  }

  return (
    <div className="summary-container">
      <h2>Expense Summary</h2>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Expenses</h3>
          <p>GH₵{totalExpenses.toFixed(2)}</p>
        </div>

        <div className="summary-card">
          <h3>Number of Expenses</h3>
          <p>{expenses.length}</p>
        </div>

        <div className="summary-card">
          <h3>Average Expense</h3>
          <p>GH₵{averageExpense.toFixed(2)}</p>
        </div>

        <div className="summary-card">
          <h3>Most Expensive Category</h3>
          <p>
            {mostExpensiveCategory} (GH₵{maxAmount.toFixed(2)})
          </p>
        </div>
      </div>

      <div className="date-range">
        <p>
          <strong>Date Range:</strong> {earliestDate} to {latestDate}
        </p>
      </div>

      <div className="category-breakdown">
        <h3>Category Breakdown</h3>
        <ul>
          {Object.entries(categoryTotals).map(([category, amount]) => (
            <li key={category}>
              <span className="category-name">{category}:</span>
              <span className="category-amount">GH₵{amount.toFixed(2)}</span>
              <span className="category-percentage">
                ({Math.round((amount / totalExpenses) * 100)}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Summary;
