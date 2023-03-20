const { ValidationError, WrongParametersError } = require('../helpers/error')

const errorMiddleware = (error, req, res, next) => {
    if (
        error instanceof ValidationError ||
        error instanceof WrongParametersError
    ) {
        return res.status(error.status).json({
            message: error.message,
        })
    }
    res.status(500).json({message: error.message})
}

module.exports = {
    errorMiddleware
}