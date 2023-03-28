const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const gravatar = require('gravatar');
const path = require('path')
const fs = require('fs/promises')

const { createUser, findUser, updateUser } = require('../service/userServices')
const { userValidSchema } = require('../service/schemas/userValidSchema')
const { ValidationError, ConflictError, NotAuthorizedError } = require('../helpers/error')

const register = async (req, res) => {
    const { email, password, subscription } = req.body
    const { error } = userValidSchema.validate(req.body, { context: { requestMethod: req.method } });

    if (error){
        throw new ValidationError(error.details[0].message)
    }

    try{
        const avatarURL = await gravatar.url(email, { d: 'identicon' });
        const result = await createUser({ email, password, avatarURL, subscription })
    
        res.status(201).json({
            Status: 'created',
            Code: 201,
            ResponseBody: { user: {
                email: result.email,
                subscription: result.subscription,
            }},
        }) 
    } catch (error){
        if(error.message.includes('email')){
            throw new ConflictError(`Email in use`)
        }

        if(error.message.includes('subscription')){
            throw new ConflictError(`Subscription value is not correct`)
        }
        
        throw new ConflictError(error.message)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    const { error } = userValidSchema.validate(req.body, { context: { requestMethod: req.method } });
  
    if (error){
        throw new ValidationError(error.details[0].message)
    }

    const user = await findUser({ email })
    const isInBase = await bcrypt.compare(password, user.password)

    if (!user || !isInBase) {
        throw new NotAuthorizedError(`Email or password is wrong`)
    }

    const token = jwt.sign({
        _id: user.id
    }, process.env.JWT_SECRET);

    const result = await updateUser({ email }, { token })

    res.status(200).json({
        Status: 'OK',
        Code: 200,
        ResponseBody: { 
            token,
            user: {
                email: result.email,
                subscription: result.subscription,
            } 
        },
    })
}

const logout = async (req, res) => {
    const { _id } = req.user
    await updateUser({ _id }, { token: null })
    res.status(204).json()
}

const current = async (req, res) => {
    const { email, subscription } = req.user
    
    res.status(200).json({
        Status: 'OK',
        Code: 200,
        ResponseBody: { user: {
            email,
            subscription,
        }},
    }) 
}

const change = async (req, res) => {
    const { _id } = req.user
    const { subscription } = req.body
    const { error } = userValidSchema.validate(req.body, { context: { requestMethod: req.method } });
   
    if (error){
        throw new ValidationError(error.details[0].message)
    }

    if (!subscription){
        throw new ConflictError(`Subscription value is missing`)
    }

    try{
        const result = await updateUser({ _id }, { subscription })

        res.status(200).json({
            Status: 'OK',
            Code: 200,
            ResponseBody: { 
                user: {
                    email: result.email,
                    subscription: result.subscription,
                } 
            },
        })
    } catch(error) {
        if(error.message.includes('enum value')){
            throw new ConflictError(`Subscription value is not correct`)
        }
        
        throw new ConflictError(error.message)
    }
}

const updateAvatar = async (req, res) => {
    const { path: oldPath, originalname } = req.file

    try{
        const newPath = path.join("public", "avatars", originalname)
        await fs.rename(oldPath, newPath)
        const result = await updateUser(req.user._id, { avatarURL: newPath })

        res.status(200).json({
            Status: 'OK',
            Code: 200,
            ResponseBody: { 
                avatarURL: result.avatarURL
            },
        })
    } catch (error){
        await fs.unlink(oldPath)
        throw Error(error)
    }
}

module.exports = { register, login, logout, current, change, updateAvatar }