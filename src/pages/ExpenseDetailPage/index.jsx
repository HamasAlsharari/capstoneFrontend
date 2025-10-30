import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as expenseAPI from "../../utilities/expense-api";
import * as categoryAPI from "../../utilities/category-api";
import * as paymentAPI from "../../utilities/payment-api";
import "./styles.css";

export default function ExpenseDetailPage() {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const [selectedPayment, setSelectedPayment] = useState("");
  const [allPayments, setAllPayments] = useState([]);

  useEffect(() => {
    async function getExpense() {
      try {
        const data = await expenseAPI.show(id);
        if (data) setExpense(data);
      } catch (err) {
        console.log(err);
      }
    }
    getExpense();
  }, [id]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await categoryAPI.index();
        setAllCategories(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const data = await paymentAPI.listPaymentMethods();
        setAllPayments(data || []);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPayments();
  }, []);

  async function handleAddCategory(evt) {
    evt.preventDefault();
    if (!selectedCategory) return;
    try {
      await expenseAPI.addCategoryToExpense(expense.id, selectedCategory);
      const updatedExpense = await expenseAPI.show(expense.id);
      setExpense(updatedExpense);
      setSelectedCategory("");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddPayment(evt) {
    evt.preventDefault();
    if (!selectedPayment) return;
    try {
      await paymentAPI.addPaymentMethodToExpense(expense.id, selectedPayment);
      const updatedExpense = await expenseAPI.show(expense.id);
      setExpense(updatedExpense);
      setSelectedPayment("");
    } catch (err) {
      console.log(err);
    }
  }

  if (!expense) return <p>Loading...</p>;

  return (
    <div className="expense-detail-page">
      <header className="page-header">
        <h1>💰 Expense Detail</h1>
      </header>

      <div className="expense-detail-card">
        <h2>{expense.title}</h2>
        <p><strong>Date:</strong> {expense.date}</p>
        <p><strong>Amount:</strong> ${expense.amount}</p>
        <p><strong>Description:</strong> {expense.description || "No description"}</p>

        <div className="expense-categories">
          <h3 style={{ color: "#1e40af" }}>Categories Linked</h3>
          {expense.categories && expense.categories.length > 0 ? (
            <ul>
              {expense.categories.map(cat => (
                <li key={cat.id} style={{ color: cat.color }}>
                  {cat.icon && <span>{cat.icon} </span>}
                  {cat.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No linked category</p>
          )}

          <form onSubmit={handleAddCategory} className="add-category-form">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Select Category</option>
              {allCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button type="submit" className="btn add-category-btn">+ Add Category</button>
          </form>
        </div>

        <div className="expense-payments">
          <h3 style={{ color: "#2e7d32" }}>Payment Methods Linked</h3>
          {expense.payment_methods && expense.payment_methods.length > 0 ? (
            <ul>
              {expense.payment_methods.map(pm => (
                <li key={pm.id}>
                  {pm.name} - {pm.type} - **{pm.last_four}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No linked payment method</p>
          )}

          <form onSubmit={handleAddPayment} className="add-payment-form">
            <select value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)}>
              <option value="">Select Payment Method</option>
              {allPayments.map(pm => (
                <option key={pm.id} value={pm.id}>
                  {pm.name} - {pm.type}
                </option>
              ))}
            </select>
            <button type="submit" className="btn add-payment-btn">+ Add Payment Method</button>
          </form>
        </div>

        <div className="expense-actions">
          <Link to={`/expenses/edit/${expense.id}`} className="btn edit">Edit</Link>
          <Link to={`/expenses/confirm_delete/${expense.id}`} className="btn danger">Delete</Link>
        </div>
      </div>
    </div>
  );
}