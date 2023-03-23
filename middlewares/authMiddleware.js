const jwt = require('jsonwebtoken')
const { NotAuthorizedError } = require('../helpers/error')
const { findUser } = require("../service/userServices")

const authMiddleware = async (req, res, next) =>{
    const { authorization = '' } = req.headers
    const [ tokenType, token ] = authorization.split(' ')

    if(tokenType !== "Bearer"){
        next(new NotAuthorizedError(`Not authorized`))
    }

    try {
        const { _id }  = await jwt.decode(token, process.env.JWT_SECRET)
        const user = await findUser({ _id })

        if(!user || !user.token){
            next(new NotAuthorizedError(`Not authorized`))
        }

        if(token !== user.token){
            next(new NotAuthorizedError(`Not authorized`))
        }

        req.user = user
        next()
    } catch (error) {
        if(error.message.includes('Cannot destructure property')){
            next(new NotAuthorizedError(`Not authorized`))
        }
        next(new Error(error.message))
    }
}

module.exports = { authMiddleware }