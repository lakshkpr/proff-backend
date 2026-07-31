import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/indexdb.js";


dotenv.config({
    path: './env'
})


connectDB();