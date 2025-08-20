import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getProduct } from '../../lib/api'

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (id) getProduct(id).then(setProduct)
  }, [id])

  if (!product) return <p>Laden...</p>

  // Functie om item in localStorage winkelmand te plaatsen
  function addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find(i => i.id === product.id)
    if (existing) {
      existing.qty += qty
    } else {
      cart.push({ id: product.id, name: product.name, price: Number(product.price), qty, image_url: product.image_url })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Toegevoegd aan winkelmandje!')
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} style={{maxWidth:500, borderRadius:10}} />
      <p className="badge">€ {Number(product.price).toFixed(2)}</p>
      <p>{product.description}</p>

      {/* Extra artikelvelden */}
      <div className="card" style={{marginTop:12}}>
        <p><strong>Artikel 1:</strong> {product.article1 || '-'}</p>
        <p><strong>Artikel 2:</strong> {product.article2 || '-'}</p>
        <p><strong>Artikel 3:</strong> {product.article3 || '-'}</p>
      </div>

      <div style={{display:'flex', gap:8, marginTop:12}}>
        <input
          className="input"
          type="number"
          min="1"
          value={qty}
          onChange={e => setQty(parseInt(e.target.value || '1',10))}
          style={{width:100}}
        />
        <button className="button" onClick={addToCart}>In winkelmandje</button>
      </div>
    </div>
  )
}
