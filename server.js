const express = require ("express")
require("./config/db")
const router = require("./router/userRouter")
const port = process.env.port
const app = express()

app.use(express.json())
app.use(router)

app.listen(port,()=>{
    console.log("server is listening to port", port);
})

app.get("/", (req,res)=>{
    res.status(200).json({message:"HELLO WORLD"})
}) 