import mongoose from "mongoose";
import {DB_NAME} from "./constants"

const connectDB= async ()=>{
    try {
        const connecionInstance= await mongoose.connect(
            `${process.env.DB_NAME}`
        );
        console.log(`/n Mongo db connected to host: ${connecionInstance.connection.host}`)
    } catch (error) {
        console.log("error is : ", error);
        throw(error);

    }
}
export default connectDB