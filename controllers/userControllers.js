const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { registerUser, loginUser } = require('../service/userServices')

const { userValidSchema } = require('../service/schemas/userValidSchema')

const register = async (req, res, next) => {
    const { email, password, subscription } = req.body
  
    const { error } = userValidSchema.validate(req.body, { context: { requestMethod: req.method } });
  
    if (error){
        return res.status(400).json({
            Status: 'error',
            Code: 400,
            Message: error.details[0].message,
        })  
    }

    try{
        const result = await registerUser({ email, password, subscription })
        res.status(201).json({
            Status: 'created',
            Code: 201,
            ResponseBody: { user: result },
        })
    } catch (error){
        console.error(error)
        next(error)     
    } 
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    // const { error } = userValidSchema.validate(req.body, { context: { requestMethod: req.method } });
  
    // if (error){
    //     return res.status(400).json({
    //         Status: 'error',
    //         Code: 400,
    //         Message: error.details[0].message,
    //     })  
    // }

    try {
        const result = await loginUser({ email })

        const isInBase = await bcrypt.compare(password, result.password)

        if (!result || !isInBase) {
            return res.status(401).json({
                Status: 'Unauthorized',
                Code: 401,
                Message: `Email or password is wrong`,
            }) 
        }
  
        const token = jwt.sign({
            _id: result.id
        }, process.env.JWT_SECRET);

        res.status(200).json({
            Status: 'OK',
            Code: 200,
            ResponseBody: { 
                token,
                user: result 
            },
        })
    } catch (error) {
        console.error(error)
        next(error)  
    }
}

module.exports = { register, login }