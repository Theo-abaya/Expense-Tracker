import React, { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const ExpenseList = () => {
  const { expenses, deleteExpense, getFilteredExpenses, getTotalExpenses } =
    useContext(ExpenseContext);

  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  const categories = [
    "",
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Shopping",
    "Healthcare",
    "Education",
    "Other",
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredExpenses = getFilteredExpenses(
    filters.category,
    filters.startDate,
    filters.endDate
  );
  const total = getTotalExpenses(filteredExpenses);

  return (
    <div className="expense-list-container">
      <h2>Expense List</h2>

      <div className="filters">
        <div className="filter-group">
          <label>Category:</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category || "All Categories"}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>From:</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>To:</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="total">
        <h3>Total: GH₵{total.toFixed(2)}</h3>
      </div>

      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{format(new Date(expense.date), "MMM dd, yyyy")}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>GH₵{parseFloat(expense.amount).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-expenses">
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="add-new">
        <Link to="/add" className="add-btn">
          Add New Expense
        </Link>
      </div>
    </div>
  );
};

export default ExpenseList;
