import '../styles/globals.css'
import Link from 'next/link'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Simpele header navigatie */}
      <div className="header">
        <Link href="/">Producten</Link>
        <Link href="/cart">Winkelmand</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/logs">Logs</Link>
      </div>
      <div className="container">
        <Component {...pageProps} />
      </div>
      <div className="footer">Eenvoudige Webshop • Demo</div>
    </>
  )
}
