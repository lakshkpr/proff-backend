class apiError extends Error {
    constructor(
        statusCode,
        message= "something went wrong" ,
        errors=[], 
        stack=""
    ){
        super(message)
        this.statusCode= statusCode
        this.message= message
        this.errors= this.errors
        this.success= false
        this.data= null
    }
}
export {apiError}