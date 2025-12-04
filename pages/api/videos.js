import { PrismaClient } from '@prisma/client'
const prisma=new PrismaClient()
export default async function handler(req,res){
 const videos=await prisma.video.findMany({include:{tags:true,creator:true}})
 res.json({videos})
}
