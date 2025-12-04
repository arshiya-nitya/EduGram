import '../styles/globals.css'
import { SWRConfig } from 'swr'
import fetch from 'node-fetch'
function fetcher(url) { return fetch(url).then(r => r.json()) }
export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}
