import { useEffect, useState } from 'react'
import { getLogs } from '../lib/api'

export default function Logs() {
  const [items, setItems] = useState([])

  useEffect(() => {
    getLogs(100, 0).then(res => setItems(res.items || []))
  }, [])

  return (
    <div>
      <h1>Logs</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Tijd</th>
            <th>Niveau</th>
            <th>Bericht</th>
            <th>Context</th>
          </tr>
        </thead>
        <tbody>
          {items.map(log => (
            <tr key={log.id}>
              <td>{new Date(log.created_at).toLocaleString()}</td>
              <td><span className="badge">{log.level}</span></td>
              <td>{log.message}</td>
              <td><pre style={{whiteSpace:'pre-wrap'}}>{log.context ? JSON.stringify(log.context) : ''}</pre></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
