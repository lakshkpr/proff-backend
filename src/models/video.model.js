import mongoose from "mongoose";
import { Schema } from "mongoose";

const videoSchema= new Schema(
    {
        videofile: {
            type: String, // from cloudnary only
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,//// also from cloudnary
            required: true,
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        vdoOwner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

export const Video= mongoose.model("Video", videoSchema)