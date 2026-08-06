import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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
        fullname: {
            type: String,
            required: true,
            trim: true,
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

userSchema.pre("save", async function (next) {

    /// now checking that whether password is updated or saced or not
    if(!this.ismodified("password")) return next()

        ////else trigger the below statements
    this.password= await bcrypt.hash(this.password,10);
    next()
}),

userSchema.methods.isPasswordCorrect= async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken= async function() {
    jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken= async function() {
    jwt.sign(
        {
            _id: this._id,
            // the diff. b/w refresh token and access token is also that
            //  refresh tokn does not contain much info. about the user
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User= mongoose.model('User', userSchema)