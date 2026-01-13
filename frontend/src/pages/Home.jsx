import CategoryGrid from "../components/CategoryGrid";
import { categories } from "../data/categories";
import { mockServices } from "../data/mockServices";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>Jaldikaam</h1>
          <p style={{ color: "#6b7280" }}>
            Find trusted local service providers near you.
          </p>
        </div>
        <Link to="/search" className="btn btn-primary">
          Search Services
        </Link>
      </header>
      <section style={{ marginTop: 20 }}>
        <h2>Categories</h2>
        <CategoryGrid categories={categories} />
      </section>
      <section style={{ marginTop: 20 }}>
        <h2>Popular Services</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginTop: 12,
          }}
        >
          {mockServices.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
