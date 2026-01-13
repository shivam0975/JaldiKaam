import { useLocation } from "react-router-dom";
import { mockServices } from "../data/mockServices";
import ServiceCard from "../components/ServiceCard";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function Search() {
  const q = useQuery();
  const term = q.get("q") || "";
  const category = q.get("category") || "";
  const filtered = mockServices.filter((s) => {
    if (category) return s.categories.includes(category);
    if (term)
      return (
        s.title.toLowerCase().includes(term.toLowerCase()) ||
        s.description.toLowerCase().includes(term.toLowerCase())
      );
    return true;
  });
  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Search results</h2>
      <div
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 12,
        }}
      >
        {filtered.map((s) => (
          <ServiceCard key={s.id} s={s} />
        ))}
      </div>
    </div>
  );
}
