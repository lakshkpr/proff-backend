import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB= async ()=>{
    try {
        const connecionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`/n Mongo db connected to host: ${connecionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGO DB connection failed ", error);
        throw(error);

    }
}
export default connectDB