import { useState } from 'react'
import { placeOrder } from '../lib/api'

export default function Checkout() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    if (cart.length === 0) { alert('Je winkelmand is leeg.'); return }
    setStatus('Bezig met verzenden...')
    const res = await placeOrder({ customer_name: name, customer_email: email, cart })
    if (res.ok) {
      localStorage.removeItem('cart')
      setStatus('Bestelling geplaatst! Je ontvangt (indien ingesteld) een bevestiging.')
    } else {
      setStatus('Er ging iets mis: ' + (res.error || 'onbekende fout'))
    }
  }

  return (
    <div>
      <h1>Afrekenen</h1>
      <form onSubmit={handleSubmit} className="card" style={{maxWidth:480}}>
        <label className="label">Naam</label>
        <input className="input" value={name} onChange={e => setName(e.target.value)} required />

        <label className="label">E-mail</label>
        <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

        <button className="button" type="submit" style={{marginTop:12}}>Bestellen</button>
      </form>
      {status && <p style={{marginTop:12}}>{status}</p>}
    </div>
  )
}
