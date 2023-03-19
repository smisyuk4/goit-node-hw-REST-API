const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) =>{
    // eslint-disable-next-line no-unused-vars
    const [ tokenType, token ] = req.headers.authorization.split(' ')

    if(!token){
        return res.status(401).json({
            Status: 'Unauthorized',
            Code: 401,
            Message: `Not authorized`,
        })  
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