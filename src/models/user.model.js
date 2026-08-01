import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema= new Schema (
    {
        username:{
            type: String,
            required: true,
            lowecase: true,
            trim: true,
            index: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            lowecase: true,
            trim: true,
            unique: true
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "video"
            }
        ],
        avatar: {
            type: String,/// url generated from cloudnary for image uploading will be given
            required: true
        },
        coverimage: {
            type: String,/// url generated from cloudnary 
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshTokens: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export const User= mongoose.model('User', userSchema)