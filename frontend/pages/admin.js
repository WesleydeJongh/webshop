// ===============================
// Eenvoudig admin-paneel
// Doel: producten toevoegen/bewerken/verwijderen
// Beveiliging: heel simpel token. Zet NEXT_PUBLIC_ADMIN_TOKEN in Vercel.
// ===============================

import { useEffect, useState } from 'react'
import { getProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct } from '../lib/api'

export default function Admin() {
  const [token, setToken] = useState(process.env.NEXT_PUBLIC_ADMIN_TOKEN || '')
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name:'', description:'', price:'', image_url:'', article1:'', article2:'', article3:'' })
  const [editId, setEditId] = useState(null)

  async function refresh() {
    const res = await getProducts(50, 0) // laad 50 voor snel beheer
    setItems(res.items || [])
  }
  useEffect(() => { refresh() }, [])

  async function save() {
    if (!token) { alert('Geen admin token gezet.'); return }
    const data = { ...form, price: Number(form.price || 0) }
    if (editId) {
      await adminUpdateProduct(editId, data, token)
    } else {
      await adminCreateProduct(data, token)
    }
    setForm({ name:'', description:'', price:'', image_url:'', article1:'', article2:'', article3:'' })
    setEditId(null)
    refresh()
  }

  function onEdit(p) {
    setEditId(p.id)
    setForm({
      name: p.name || '',
      description: p.description || '',
      price: p.price || '',
      image_url: p.image_url || '',
      article1: p.article1 || '',
      article2: p.article2 || '',
      article3: p.article3 || '',
    })
  }

  async function onDelete(id) {
    if (!token) { alert('Geen admin token gezet.'); return }
    if (confirm('Zeker weten verwijderen?')) {
      await adminDeleteProduct(id, token)
      refresh()
    }
  }

  return (
    <div>
      <h1>Admin</h1>
      <p className="badge">Zet in Vercel: NEXT_PUBLIC_API_URL & NEXT_PUBLIC_ADMIN_TOKEN</p>

      <div className="card" style={{maxWidth:700}}>
        <div className="field">
          <label className="label">Admin token</label>
          <input className="input" value={token} onChange={e => setToken(e.target.value)} placeholder="Voer je admin token in" />
        </div>

        <h3>{editId ? 'Bewerk product' : 'Nieuw product'}</h3>
        <div className="field"><label className="label">Naam</label><input className="input" value={form.name} onChange={e => setForm({...form, name:e.target.value})} /></div>
        <div className="field"><label className="label">Omschrijving</label><textarea className="input" value={form.description} onChange={e => setForm({...form, description:e.target.value})} /></div>
        <div className="field"><label className="label">Prijs</label><input className="input" type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price:e.target.value})} /></div>
        <div className="field"><label className="label">Afbeelding URL</label><input className="input" value={form.image_url} onChange={e => setForm({...form, image_url:e.target.value})} /></div>

        <div className="field"><label className="label">Artikel 1</label><input className="input" value={form.article1} onChange={e => setForm({...form, article1:e.target.value})} /></div>
        <div className="field"><label className="label">Artikel 2</label><input className="input" value={form.article2} onChange={e => setForm({...form, article2:e.target.value})} /></div>
        <div className="field"><label className="label">Artikel 3</label><input className="input" value={form.article3} onChange={e => setForm({...form, article3:e.target.value})} /></div>

        <div style={{display:'flex', gap:8}}>
          <button className="button" onClick={save}>{editId ? 'Opslaan' : 'Toevoegen'}</button>
          {editId && <button className="button secondary" onClick={()=>{ setEditId(null); setForm({ name:'', description:'', price:'', image_url:'', article1:'', article2:'', article3:'' })}}>Annuleer</button>}
        </div>
      </div>

      <h2 style={{marginTop:16}}>Bestaande producten</h2>
      <table className="table">
        <thead><tr><th>ID</th><th>Naam</th><th>Prijs</th><th>Acties</th></tr></thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>€ {Number(p.price).toFixed(2)}</td>
              <td>
                <button className="button secondary" onClick={() => onEdit(p)}>Bewerk</button>{' '}
                <button className="button" onClick={() => onDelete(p.id)}>Verwijder</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
