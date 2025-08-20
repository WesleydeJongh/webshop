// Simpele kaartcomponent (optioneel; in dit voorbeeld niet strikt nodig)
// Gelaten voor uitbreiding/lesdoeleinden.
export default function ProductCard({ p }) {
  return (
    <div className="card">
      <img src={p.image_url} alt={p.name} style={{width:'100%', borderRadius:8}} />
      <h3>{p.name}</h3>
      <p className="badge">€ {Number(p.price).toFixed(2)}</p>
      <p>{p.description}</p>
    </div>
  )
}
