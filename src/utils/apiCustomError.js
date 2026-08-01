class apiError extends Error {
    constructor(
        message= "something went wrong",
        statusCode, 
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