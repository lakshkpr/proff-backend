import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/indexdb.js";
import { app } from "./app.js";


dotenv.config({
    path: './env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})

// if the connection is established then the error part or listening on port part is encountered