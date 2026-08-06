class apiResponse {
    constructor(
        statusCode, data, message= "something went wrong"
    ){
        this.data=data,
        this.message= message,
        this.statusCode= statusCode,
        this.success= statusCode< 400
    }
}

export {apiResponse}