//set up error class 
class AppError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

//export the above
module.exports = AppError; 