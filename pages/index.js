import useSWR from 'swr'
import Link from 'next/link'
export default function Feed() {
  const { data, error } = useSWR('/api/videos')
  if (error) return <div>Failed</div>
  if (!data) return <div>Loading...</div>
  return (
    <div style={{ padding: 20 }}>
      <h1>BiteMVP Feed</h1>
      <p><Link href="/upload">Upload</Link></p>
      {data.videos.map(v => (
        <div key={v.id} style={{ border:'1px solid #ddd', padding:12, margin:12 }}>
          <h3>{v.title}</h3>
          <video controls width="480" src={`/uploads/${v.filename}`} />
          <p>{v.description}</p>
        </div>
      ))}
    </div>
  )
}
