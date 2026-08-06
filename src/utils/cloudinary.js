import { v2 as cloudinary} from "cloudinary";
import fs from "fs"

// v2 is a kind of built in liabrary that contains uploading inbuilt fuction to upload the req. file
// this "fs" is cxalled a file system that handles or take under control the file handling
// this fs is by default added with "node js"
// helps to handle file/ edit it/ open it/ read it/ collect data from it etc.
// "unlink" means deleting a file i.e unlinking it from the file system


const uploadingOnCloudinary= async function(localFilePath) {
    try {
        if(!localFilePath) return null
        // we are gonna upload the local file path to cloudinary
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        /// from now if file has been uploaded successfully then
        console.log("file uploaded successfully", response.url)
        return response
        /// we have returned response to the user so that it can extract url req from it
        
    } catch (error) {
        /// if local file path jasn't been uploaded to cloudinary then
         fs.unlinkSync(localFilePath)
         ///here is for uploading operation failed
         return null
    }
}

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

 export {uploadingOnCloudinary}   