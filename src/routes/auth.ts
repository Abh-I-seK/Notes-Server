import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const router = express.Router();
const prisma = new PrismaClient();
const SECRET = process.env.SECRET_S +"";

router.post("/signup", async(req,res)=>{
    const {username , password} = req.body;

    const user = await prisma.user.findUnique({
        where : {
            username : username
        }
    });

    if(user){
        res.status(403).json({msg : "username already Exists"});
        await prisma.$disconnect();
        return;
    }

    var u = await prisma.user.create({
        data:{
            username:username,
            password:password
        }
    });

    res.json({message : "User created !!" , username})
    await prisma.$disconnect();

});


router.post("/login", async(req,res)=>{
    const {username , password} = req.body;

    const user = await prisma.user.findUnique({
        where : {
            username : username,
            password : password
        }
    });

    if(user){
        const token = jwt.sign({ username : username }, SECRET, { expiresIn: '1h' });
        await prisma.user.update({
            where:{
                username : username,
                password : password
            },
            data:{
                token : token
            },
        })
        res.json({ message: 'Logged in successfully', token });
        await prisma.$disconnect();
        return;
    }

    res.status(403).json({message : "Invalid username or Password"})
    await prisma.$disconnect();

});


export default router;