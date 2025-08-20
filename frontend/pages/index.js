import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProducts } from '../lib/api'

export default function Home() {
  // State voor producten en paginering
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(12)
  const [offset, setOffset] = useState(0)

  // Bij laden: producten ophalen
  useEffect(() => {
    getProducts(limit, offset).then((res) => {
      setItems(res.items || [])
      setTotal(res.total || 0)
    })
  }, [limit, offset])

  const next = () => { if (offset + limit < total) setOffset(offset + limit) }
  const prev = () => { if (offset - limit >= 0) setOffset(offset - limit) }

  return (
    <div>
      <h1>Producten</h1>
      <div className="grid">
        {items.map(p => (
          <div key={p.id} className="card">
            <img src={p.image_url} alt={p.name} style={{width:'100%', borderRadius:8}} />
            <h3>{p.name}</h3>
            <p className="badge">€ {Number(p.price).toFixed(2)}</p>
            <p>{p.description}</p>
            <Link href={`/product/${p.id}`}>Bekijk product →</Link>
          </div>
        ))}
      </div>

      {/* Simpele paginering */}
      <div style={{display:'flex', gap:8, marginTop:16}}>
        <button className="button secondary" onClick={prev} disabled={offset===0}>Vorige</button>
        <button className="button" onClick={next} disabled={offset+limit>=total}>Volgende</button>
        <span style={{alignSelf:'center'}}>Totaal: {total}</span>
      </div>
    </div>
  )
}
