import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = process.env.SECRET_S +"";

const prisma = new PrismaClient();


router.get("/", async(req,res)=>{
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

     let notes = await prisma.note.findMany({
        where :{
            authorId : user
        }
    })


    res.json({notes})
    await prisma.$disconnect();

});

router.get("/:id", async(req,res)=>{
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

    const id = parseInt(req.params.id);
    let notes = await prisma.note.findMany({
        where :{
            authorId : user,
            id : id
        }
    })

    res.json({notes})
    await prisma.$disconnect();

});

router.post("/", async(req,res)=>{
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
    const {content} = req.body;

    await prisma.note.create({
        data :{
            content : content,
            authorId : user
        }
    })


    res.json({message : "New Note Added !!"});
    await prisma.$disconnect();

});

router.put("/:id", async(req,res)=>{
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

    const id = parseInt(req.params.id);
    const {content} = req.body;
    let notes = null;
    try{
        notes = await prisma.note.update({
            where :{
                authorId : user,
                id : id
            },
            data:{
                content : content
            }
        })
    }catch{
        await prisma.$disconnect();
        res.status(403).json({message : "you do not have a note with that id !!!"});
        return;
    }
    res.json({message : "Note updated !!" , notes})
    await prisma.$disconnect();

});

router.delete("/:id", async(req,res)=>{
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

    const id = parseInt(req.params.id);
    let notes = null;
    try{
        notes = await prisma.note.delete({
            where :{
                authorId : user,
                id : id
            },
        })
    }catch{
        await prisma.$disconnect();
        res.status(403).json({message : "you do not have a note with that id !!"});
        return
    }

    res.json({message : "Note deleted !!" , notes})
    await prisma.$disconnect();

});

router.post("/:id/share", async(req,res)=>{
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

    const id = parseInt(req.params.id);
    let content = null;
    // passing the id of the user to pass the id to in body
    const shareTO = parseInt(req.body.shareToUser);
    const check = await prisma.user.findUnique({
        where : {
            id:shareTO
        }
    })
    if(check){
        let notes = await prisma.note.findUnique({
            where :{
                authorId : user,
                id : id
            }
        });
        if(!notes){
            res.status(403).json({message : "Incorrect id for note !!"});
            await prisma.$disconnect();
            return;
        }
        content = notes.content;

        await prisma.note.create({
            data : {
                content : content,
                authorId : shareTO
            }
        })
        
        res.json({message : "Note updated !!" , notes})
        await prisma.$disconnect();

    }else{
        res.status(403).json({message : "Incorrect id for note !!"});
        await prisma.$disconnect();
        return;
    }

});


export default router;
