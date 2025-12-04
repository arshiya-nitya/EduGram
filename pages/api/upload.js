import formidable from 'formidable'
import path from 'path'
import { PrismaClient } from '@prisma/client'
export const config={api:{bodyParser:false}}
const prisma=new PrismaClient()
export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).end()
 const form=formidable({uploadDir:'./public/uploads',keepExtensions:true})
 form.parse(req,async (e,flds,files)=>{
   try{
     const file=files.file
     const filename=path.basename(file.filepath||file.path)
     let creator=await prisma.creator.findFirst({where:{name:flds.creatorName}})
     if(!creator) creator=await prisma.creator.create({data:{name:flds.creatorName}})
     const tagNames=(flds.tags||'').split(',').map(t=>t.trim()).filter(Boolean)
     const tg=[]
     for(const name of tagNames){
       let t=await prisma.tag.findUnique({where:{name}})
       if(!t) t=await prisma.tag.create({data:{name}})
       tg.push({id:t.id})
     }
     const vid=await prisma.video.create({
       data:{title:flds.title,filename,creator:{connect:{id:creator.id}},tags:{connect:tg}}
     })
     res.json({ok:true,video:vid})
   }catch(err){res.json({ok:false,error:err.message})}
 })
}
