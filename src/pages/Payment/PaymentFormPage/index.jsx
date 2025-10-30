import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as paymentAPI from "../../../utilities/payment-api";
import "../styles.css";

export default function PaymentFormPage({ createPaymentMethod, editPaymentMethod, deletePaymentMethod }) {
  const initialState = { name: "", type: "", last_four: "" };
  const [formData, setFormData] = useState(initialState);
  const [currPayment, setCurrPayment] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const nameOptions = ["Visa", "MasterCard", "Amex", "Discover"];
  const typeOptions = ["Credit", "Debit", "Prepaid"];

  useEffect(() => {
    if ((editPaymentMethod || deletePaymentMethod) && id) getAndSetPayment();
    async function getAndSetPayment() {
      try {
        const paymentDetail = await paymentAPI.showPaymentMethod(id);
        setFormData({ name: paymentDetail.name, type: paymentDetail.type, last_four: paymentDetail.last_four });
        setCurrPayment(paymentDetail);
      } catch (err) {
        setFormData(initialState);
        setCurrPayment(null);
      }
    }
  }, [id]);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const newPayment = editPaymentMethod
        ? await paymentAPI.updatePaymentMethod(currPayment.id, formData)
        : await paymentAPI.createPaymentMethod(formData);
      setFormData(initialState);
      navigate(`/payment-methods/${newPayment.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    try {
      const response = await paymentAPI.deletePayment(currPayment.id);
      if (response.success) navigate("/payment-methods");
    } catch (err) {
      console.log(err);
    }
  }

  if (deletePaymentMethod && !currPayment) return <h1>Loading</h1>;
  if (deletePaymentMethod && currPayment) return (
    <div className="payment-form-page">
      <h1>Delete Payment Method?</h1>
      <h2>Are you sure you want to delete {currPayment.name}?</h2>
      <form onSubmit={handleDelete}>
        <Link to={`/payment-methods/${currPayment.id}`} className="btn cancel">Cancel</Link>
        <button type="submit" className="btn danger">Yes - Delete!</button>
      </form>
    </div>
  );

  return (
    <div className="payment-form-page">
      <h1>{editPaymentMethod ? `Edit ${currPayment?.name}`: "Add Payment Method"}</h1>
      <form className="payment-form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_name">Name</label>
          <select name="name" id="id_name" value={formData.name} onChange={handleChange} required>
            <option value="">Select Name</option>
            {nameOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="id_type">Type</label>
          <select name="type" id="id_type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="id_last_four">Last Four</label>
          <input type="text" name="last_four" id="id_last_four" value={formData.last_four} onChange={handleChange} required maxLength={4} />
        </div>
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
}