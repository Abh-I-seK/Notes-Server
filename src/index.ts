import express from "express";
import authRoutes from "./routes/auth";
import noteRoute from "./routes/notes";
import rateLimit from "express-rate-limit";
import searchRoute from "./routes/search";
const app = express();
app.use(express.json());

const limiter = rateLimit({
    windowMs : 15 * 60 *1000,
    limit : 100,
    standardHeaders : 'draft-7',
    legacyHeaders : false 
});
app.use(limiter);
app.use("/auth", authRoutes);
app.use("/notes", noteRoute);
app.use("/search",searchRoute);

app.get("/",(req,res)=>{
    res.status(200).json({msg : "hello"})
})


export default app
