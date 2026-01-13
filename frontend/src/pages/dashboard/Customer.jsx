import { mockServices } from "../../data/mockServices";
export default function CustomerDashboard() {
  const bookings = [
    { id: "bk1", service: mockServices[0].title, time: "2025-09-01 10:00" },
    { id: "bk2", service: mockServices[1].title, time: "2025-09-05 14:00" },
  ];
  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Customer Dashboard</h2>
      <div style={{ marginTop: 12 }}>
        {bookings.map((b) => (
          <div
            key={b.id}
            style={{
              padding: 12,
              border: "1px solid #e6e9ee",
              background: "#fff",
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 600 }}>{b.service}</div>
                <div style={{ color: "#6b7280" }}>{b.time}</div>
              </div>
              <div style={{ color: "#10b981" }}>Confirmed</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
