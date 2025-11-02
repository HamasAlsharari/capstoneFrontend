import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as expenseAPI from "../../utilities/expense-api";
import "./styles.css";

export default function ExpenseFormPage({ createExpense, editExpense, deleteExpense, user }) {
  const initialState = { title: "", amount: "", description: "", date: "" };
  const [formData, setFormData] = useState(initialState);
  const [currExpense, setCurrExpense] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchExpense() {
      try {
        const expense = await expenseAPI.show(id);
        setCurrExpense(expense);
        setFormData({
          title: expense.title || "",
          amount: expense.amount || "",
          description: expense.description || "",
          date: expense.date || ""
        });
      } catch {
        setCurrExpense(null);
        setFormData(initialState);
      }
    }
    if ((editExpense || deleteExpense) && id) fetchExpense();
  }, [id]);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        user: user.id 
      };

      if (editExpense) {
        await expenseAPI.update(dataToSend, currExpense.id);
      } else {
        await expenseAPI.create(dataToSend);
      }
      setFormData(initialState);
      navigate("/expenses");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    try {
      await expenseAPI.deleteExpense(currExpense.id);
      navigate("/expenses");
    } catch (err) {
      console.log(err);
    }
  }

  if ((editExpense || deleteExpense) && !currExpense) return <h1>Loading...</h1>;

  if (deleteExpense && currExpense) {
    return (
      <div className="expense-form-page">
        <h1>Delete Expense?</h1>
        <p>Are you sure you want to delete "{currExpense.title}"?</p>
        <form onSubmit={handleDelete}>
          <button type="submit" className="btn danger">Yes - Delete!</button>
          <Link to={`/expenses/${currExpense.id}`} className="btn cancel">Cancel</Link>
        </form>
      </div>
    );
  }

  return (
    <div className="expense-form-page">
      <h1>{editExpense ? "Edit Expense" : "Add New Expense"}</h1>
      <form className="expense-form-container" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>Amount:</label>
        <input name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <label>Date:</label>
        <input name="date" type="date" value={formData.date} onChange={handleChange} />

        <button type="submit">{editExpense ? "Update Expense" : "Add Expense"}</button>
        {editExpense && <Link to={`/expenses/${currExpense.id}`} className="btn cancel">Cancel</Link>}
      </form>
    </div>
  );
}