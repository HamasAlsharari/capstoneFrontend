import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as paymentAPI from "../../../utilities/payment-api";
import "../styles.css";

export default function PaymentListPage() {
  const [allPayments, setAllPayments] = useState([]);

  useEffect(() => {
    async function getPayments() {
      try {
        const data = await paymentAPI.listPaymentMethods();
        setAllPayments(data || []);
      } catch (err) {
        console.log(err);
        setAllPayments([]);
      }
    }
    getPayments();
  }, []);

  return (
    <div className="payment-page">
      <header className="page-header">
        <h1>💳 Payment Methods</h1>
        <p>Manage your saved payment methods below.</p>
        <Link to="/payment-methods/new" className="add-btn">+ Add Payment Method</Link>
      </header>

      <div className="payment-index-card-container">
        {allPayments.map(pm => (
          <div key={pm.id} className="payment-index-card">
            <div className="payment-detail-card-content">
              <h2>{pm.name}</h2>
              <p>Type: {pm.type}</p>
              <p>Last Four: {pm.last_four}</p>
            </div>
            <Link to={`/payment-methods/${pm.id}`} className="btn">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}