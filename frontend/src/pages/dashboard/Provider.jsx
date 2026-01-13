export default function ProviderDashboard() {
  const jobs = [
    { id: "j1", title: "Plumbing - K. Nagar", time: "2025-09-01 10:00" },
    { id: "j2", title: "AC Install - MG Road", time: "2025-09-03 11:00" },
  ];

  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Provider Dashboard</h2>
      <div style={{ marginTop: 12 }}>
        {jobs.map((j) => (
          <div
            key={j.id}
            style={{
              padding: 12,
              border: "1px solid #e6e9ee",
              background: "#fff",
              borderRadius: 8,
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{j.title}</div>
              <div style={{ color: "#6b7280" }}>{j.time}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn">Accept</button>
              <button className="btn">Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
