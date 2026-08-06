import multer from "multer";

const storage= multer.diskStorage(
    {
    destination: function(req, file, cb){
        cb(null, "./public/temp")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
    /// the null written in above 2 specifiactions are that errors are null
    // or we're not going to handle the errors here
    }
)

export const upload= multer({storage: storage})