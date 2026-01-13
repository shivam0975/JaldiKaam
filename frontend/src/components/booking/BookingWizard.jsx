import { useState } from "react";
import "../../styles/BookingWizard.css";
export default function BookingWizard({ service, onBooked }) {
  const [step, setStep] = useState(1);
  const [datetime, setDatetime] = useState("");
  function confirm() {
    const booking = {
      id: "bk_" + Date.now(),
      serviceId: service.id,
      serviceTitle: service.title,
      startTime: datetime,
      status: "confirmed",
    };
    onBooked && onBooked(booking);
    setStep(3);
  }
  return (
    <div className="booking">
      <h4 style={{ margin: 0, fontWeight: 600 }}>Book: {service.title}</h4>
      {step === 1 && (
        <>
          <p style={{ marginTop: 8 }}>Preferred date & time</p>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
          <div style={{ marginTop: 8 }}>
            <button onClick={() => setStep(2)} className="btn btn-primary">
              Next
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <p style={{ marginTop: 8 }}>Confirm</p>
          <div>
            Scheduled: <strong>{datetime}</strong>
          </div>
          <div style={{ marginTop: 8 }}>
            <button
              onClick={confirm}
              className="btn"
              style={{ background: "#10b981", color: "#fff" }}
            >
              Confirm
            </button>
            <button
              onClick={() => setStep(1)}
              style={{ marginLeft: 8 }}
              className="btn"
            >
              Back
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <div style={{ marginTop: 8, color: "#059669" }}>
          Booking confirmed ✅
        </div>
      )}
    </div>
  );
}
