import { mockServices } from "../../data/mockServices";
export default function AdminPanel() {
  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Admin Panel (Demo)</h2>
      <section style={{ marginTop: 12 }}>
        <h3>Services</h3>
        <div style={{ marginTop: 8 }}>
          {mockServices.map((s) => (
            <div
              key={s.id}
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
                <div style={{ fontWeight: 600 }}>{s.title}</div>
                <div style={{ color: "#6b7280" }}>{s.provider}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn">Edit</button>
                <button className="btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
