import "../../styles/Footer.css";
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div style={{ textAlign: "center", color: "#6b7280" }}>
          © {new Date().getFullYear()} Jaldikaam — Demo
        </div>
      </div>
    </footer>
  );
}
