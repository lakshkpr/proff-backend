import {asynchandler} from "../utils/asynchandler.js"
import { apiError } from "../utils/apiCustomError.js"
import { User } from "../models/user.model.js"
import { uploadingOnCloudinary } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"

const userRegister= asynchandler(async (req, res)=>{
    /// i m going to write steps for registering the user to web

    //1. fetch personal details of user from frontend
    //2. apply validation-not empty
    //3. check if the user already exists: using username/ email
    //4. check for avatar and images of user
    //5. upload on cloudinary
    //6. create a user objecet to save its info. = create entry in mongoDB
    //7. remove password , refreshtoken fields and similar info. from response
    //8. check if the usrer is created
    //9. return Response

    const {email, password, fullname, username}= req.body
    console.log(email)// step.1 completed

    if(
        [email, password, fullname, username].some((fields)=>{
            fields?.trim()==""
        })
        /// advanced code for checking all feilds directly if any of these is empty
    )
    {
        throw new apiError(400, "all fields are required")
    }/// step.2 completed

    const existedUser= User.findOne(
        {
            $or: [ {email}, {username} ]
            // this $"or" operator is new operator that checks if any of the 2 exists in "DB" or not
        }
    )
    if(existedUser){
        throw new apiError(409, "This email or username already exists")
    }///STEP.3 COMPLETED

    // the middleware we provided in the router file will add extra info.
    // mainly files or images to be used in the request and response 
    const avatarlocalPath= req.files?.avatar[0]?.path
    const coverImagelocalPath= req.files?.coverImage[0]?.path

    if(!avatarlocalPath){
        throw new apiError(400, "avatar file is required")
    }// step.4 completed

    const avatar= await uploadingOnCloudinary(avatarlocalPath)
    const coverImage= await uploadingOnCloudinary(coverImagelocalPath)
    // step.5 completed

    const user= User.create(
        {
            email,
            password,
            avatar: avatar.url,
            fullname,
            username: username.toLowerCase,
            coverImage: coverImage?.url || ""
        }
    ) // step.6 completed

    const isCreated= await User.findById(user._id).select("-password -refreshTokens")
    /// "findbyId" will check if the user with given _id exists in "mondo db" enteries or not
    // "mongodb" gives a unique accessible "_id" to each of its entry

    // this ".select()" works to remove the given attributues from the user object
    // follow the as it is syntax for "select()" with precautions.

    if(!isCreated){
        throw new apiError(500, "something went wrong in uploading the avatar")
    }

    return res.status(201).json(
        new apiResponse(200, isCreated, "User registered successfully")
    )
})

export {userRegister}
 