import { useParams } from "react-router-dom";
import { mockServices } from "../data/mockServices";
import BookingWizard from "../components/booking/BookingWizard";
import { useState } from "react";
export default function ServiceDetail() {
  const { id } = useParams();
  const service = mockServices.find((s) => s.id === id);
  const [booking, setBooking] = useState(null);
  if (!service)
    return (
      <div className="container" style={{ padding: 24 }}>
        Service not found
      </div>
    );
  return (
    <div className="container" style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0 }}>{service.title}</h2>
          <p style={{ color: "#6b7280" }}>{service.description}</p>
          <p style={{ marginTop: 12, fontWeight: 600 }}>
            {service.price} {service.currency}
          </p>
        </div>
        <div style={{ width: 320 }}>
          <BookingWizard service={service} onBooked={(b) => setBooking(b)} />
        </div>
      </div>
      {booking && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            border: "1px solid #d1fae5",
            background: "#ecfdf5",
          }}
        >
          Booking created: <strong>{booking.id}</strong> at{" "}
          <strong>{booking.startTime}</strong>
        </div>
      )}
    </div>
  );
}
