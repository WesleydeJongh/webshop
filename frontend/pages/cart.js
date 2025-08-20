import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Cart() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  function updateCart(newCart) {
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  function total() {
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  }

  return (
    <div>
      <h1>Winkelmand</h1>

      {cart.length === 0 && <p>Je winkelmand is leeg.</p>}

      {cart.map((item, idx) => (
        <div key={idx} className="card" style={{display:'flex', gap:12, alignItems:'center'}}>
          <img src={item.image_url} alt={item.name} style={{width:80, height:80, objectFit:'cover', borderRadius:8}} />
          <div style={{flex:1}}>
            <strong>{item.name}</strong>
            <div>€ {item.price.toFixed(2)}</div>
          </div>
          <div style={{display:'flex', gap:6, alignItems:'center'}}>
            <button className="button secondary" onClick={() => {
              const c = [...cart]; c[idx].qty -= 1; if (c[idx].qty <= 0) c.splice(idx,1); updateCart(c)
            }}>-</button>
            <div>{item.qty}</div>
            <button className="button" onClick={() => {
              const c = [...cart]; c[idx].qty += 1; updateCart(c)
            }}>+</button>
          </div>
          <button className="button secondary" onClick={() => {
            const c = [...cart]; c.splice(idx,1); updateCart(c)
          }}>Verwijder</button>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={{marginTop:12}}>
          <p><strong>Totaal:</strong> € {total().toFixed(2)}</p>
          <Link className="button" href="/checkout">Naar afrekenen →</Link>
        </div>
      )}
    </div>
  )
}
