import { PrismaClient } from '@prisma/client'
const prisma=new PrismaClient()
export default async function handler(req,res){
 if(req.method==='GET'){
   const id=parseInt(req.query.id)
   const course=await prisma.microCourse.findUnique({
     where:{id},
     include:{items:{include:{video:true}}}
   })
   return res.json({course})
 }
 res.status(405).end()
}
