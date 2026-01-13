import { Link } from 'react-router-dom';
import '../styles/ServiceCard.css';
export default function ServiceCard({ s }) {
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div className="service-title">{s.title}</div>
        <div style={{fontSize:12}}>{s.rating} ★</div>
      </div>
      <p className="service-desc">{s.description}</p>
      <div className="service-footer">
        <div className="font-semibold">{s.price} {s.currency}</div>
        <Link to={`/service/${s.id}`}>View</Link>
      </div>
    </div>
  );
}
