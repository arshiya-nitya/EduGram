import { useState } from 'react'
export default function Upload() {
  const [title,setTitle]=useState('')
  const [file,setFile]=useState(null)
  const [tags,setTags]=useState('')
  async function submit(e){
    e.preventDefault()
    const fd=new FormData()
    fd.append('title',title)
    fd.append('tags',tags)
    fd.append('creatorName','Demo Creator')
    fd.append('file',file)
    const r=await fetch('/api/upload',{method:'POST',body:fd})
    const j=await r.json()
    if(j.ok) alert('uploaded')
  }
  return (
    <form onSubmit={submit} style={{padding:20}}>
      <h1>Upload</h1>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder='title'/><br/>
      <input value={tags} onChange={e=>setTags(e.target.value)} placeholder='tags'/><br/>
      <input type='file' onChange={e=>setFile(e.target.files[0])}/><br/>
      <button>Upload</button>
    </form>
  )
}
