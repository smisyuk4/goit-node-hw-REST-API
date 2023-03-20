const jwt = require('jsonwebtoken')
const { NotAuthorizedError } = require('../helpers/error')


const authMiddleware = async (req, res, next) =>{
    const { authorization = '' } = req.headers
    const [ tokenType, token ] = authorization.split(' ')

    if(tokenType !== "Bearer"){
        next(new NotAuthorizedError(`Not authorized`))
    }

    if(!token){
        next(new NotAuthorizedError(`Not authorized`))
    }

    try {
        const user = await jwt.decode(token, process.env.JWT_SECRET)
        req.user = user
        req.token = token
        // next()
    } catch (error) {
        console.log(error.message)
        next()
    }
    next()
}

module.exports = { authMiddleware }