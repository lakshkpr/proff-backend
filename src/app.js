import express, { json } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"


const app= express();
app.use(cors(
   { origin: process.env.CORS_ORIGIN,
    credentials: true
   }
))
app.use(express.json({
    limit: "15kb",
}))
app.use(express.urlencoded({limit: "15kb"}))
app.use(express.static("public"))
app.use(cookieParser())
///all of the above are middlewares and yhence they must be written at the same place

//here now we will import routers

// Routes importing:

import userRouter from "./routes/user.routes.js"
   //"userRouter" is just a name we can change it acc. to our own

// Routes declaration:
app.use("/api/v1/user", userRouter)


export {app}