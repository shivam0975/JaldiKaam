import { Link } from "react-router-dom";
export default function CategoryGrid({ categories }) {
  const items = categories.flatMap((g) => g.items);
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}
    >
      {items.map((c) => (
        <Link
          key={c.slug}
          to={`/search?category=${c.slug}`}
          style={{
            display: "block",
            padding: 16,
            background: "#fff",
            borderRadius: 8,
            textAlign: "center",
            border: "1px solid #e6e9ee",
          }}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
