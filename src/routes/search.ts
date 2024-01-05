import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();
const SECRET = process.env.SECRET_S +"";

router.get("/" , async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    let user = null;
    // Authentication
    if(token){
        var a = undefined;
        jwt.verify(token , SECRET , (err , payload)=>{
            a = payload;
        })
        if(!a){
            await prisma.$disconnect();
            res.status(403).json({message : "Login or Signup"});
            return;
        }
        let m = await prisma.user.findUnique({
            where : {
                token : token,
            }
        })
        if(!m){
            await prisma.$disconnect();
            res.status(403).json({message : "Login or Signup"});
            return;
        }
        user = m.id;
    }else{
        await prisma.$disconnect();
        res.status(403).json({message : "Login or Signup"});
        return;
    }

    // 

    const { q:query} = req.query;
    let m = ""+query;
    const notes = await prisma.note.findMany({
        where:{
            content:{
                contains:m
            },
            authorId: user
        }
    });
    res.json({notes , m});
    await prisma.$disconnect();
});

export default router;