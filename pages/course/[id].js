import { useRouter } from 'next/router'
import useSWR from 'swr'
export default function C(){
 const r=useRouter()
 const id=r.query.id
 const {data}=useSWR(id?`/api/courses?id=${id}`:null)
 if(!data) return 'Loading'
 return <pre>{JSON.stringify(data,null,2)}</pre>
}
