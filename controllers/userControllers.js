const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const gravatar = require('gravatar');
const path = require('path')
const fs = require('fs/promises')
const { nanoid } = require('nanoid')

const { createUser, findUser, updateUser } = require('../service/userServices')
const { userValidSchema, userVerifyEmail } = require('../service/schemas/userValidSchema')
const { ValidationError, ConflictError, NotAuthorizedError, WrongParametersError } = require('../helpers/error')
const { resizeImage } = require('../middlewares/resizeImageMiddleware')
const { sendEmail } = require('../helpers/sendEmail');

const register = async (req, res) => {
    const { email, password, subscription } = req.body
    const { error } = userValidSchema.validate(req.body, { context: { requestMethod: req.method } });

    if (error){
        throw new ValidationError(error.details[0].message)
    }

    try{
        const avatarURL = await gravatar.url(email, { d: 'identicon' });
        const verificationToken = nanoid()
        const result = await createUser({ email, password, avatarURL, subscription, verificationToken })

        await sendEmail(email, verificationToken)
    
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

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params
  
    const user = await findUser({ verificationToken })

    if(!user){
        throw new WrongParametersError(`User not found`)
    }

    await updateUser( user._id , { verify: true, verificationToken: ' ' })

    res.status(200).json({
        Status: 'OK',
        Code: 200,
        ResponseBody: { 
            message: 'Verification successful'
        },
    })
}

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body
    const { error } = userVerifyEmail.validate(req.body, { context: { requestMethod: req.method } });
  
    if (error){
        throw new ValidationError(error.details[0].message)
    }

    const user = await findUser({ email })
    if (!user) {
        throw new NotAuthorizedError(`Email is wrong`)
    }

    if(user.verify){
        throw new Error(`Verification has already been passed`)
    }

    await sendEmail(email, user.verificationToken)

    res.status(200).json({
        Status: 'OK',
        Code: 200,
        ResponseBody: { 
            message: 'Verification email sent'
        },
    })
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

    if (!user.verify){
        throw new NotAuthorizedError(`Email not verified`)
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
    const { _id: userId} = req.user

    await resizeImage(oldPath)

    const newImageName = `${userId}_${originalname}`

    try{
        const newPath = path.join("public", "avatars", newImageName)
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

module.exports = { register, verifyEmail, resendVerifyEmail, login, logout, current, change, updateAvatar }