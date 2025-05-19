import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";
import Navbar from "./components/Navbar";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import Summary from "./components/Summary";
import "./App.css";

function App() {
  return (
    <Router>
      <ExpenseProvider>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<AddExpense />} />
              <Route path="/add" element={<AddExpense />} />
              <Route path="/list" element={<ExpenseList />} />
              <Route path="/charts" element={<ExpenseChart />} />
              <Route path="/summary" element={<Summary />} />
            </Routes>
          </div>
        </div>
      </ExpenseProvider>
    </Router>
  );
}

export default App;
