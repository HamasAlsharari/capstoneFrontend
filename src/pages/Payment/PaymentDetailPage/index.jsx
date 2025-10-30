import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as paymentAPI from "../../../utilities/payment-api";
import "../styles.css";

export default function PaymentDetailPage() {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const data = await paymentAPI.showPaymentMethod(id);
        setPayment(data);
      } catch (err) {
        console.log(err);
        setPayment(null);
      }
    }
    fetchPayment();
  }, [id]);

  if (!payment) return <h3>Loading Payment Method...</h3>;

  return (
    <div className="payment-detail-card">
      <div className="payment-detail-card-content">
        <h2>{payment.name}</h2>
        <p>Type: {payment.type}</p>
        <p>Last Four: {payment.last_four}</p>
      </div>
      <div className="payment-actions">
        <Link to={`/payment-methods/edit/${payment.id}`} className="btn warn">Edit</Link>
        <Link to={`/payment-methods/confirm_delete/${payment.id}`} className="btn danger">Delete</Link>
      </div>
    </div>
  );
}