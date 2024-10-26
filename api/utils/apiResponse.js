// we made a utility of api response all the response will come by this utility
class ApiResponse {
    constructor(statusCode, data, message = "success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.slug = slug
        this.sucess = statusCode < 400
    }
}

export {ApiResponse}