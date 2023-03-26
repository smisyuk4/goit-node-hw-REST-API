const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const gravatar = require('gravatar');
const path = require('path')
const fs = require('fs/promises')

const { createUser, findUser, updateUser} = require('../service/userServices')

const { userValidSchema } = require('../service/schemas/userValidSchema')
const { ValidationError, ConflictError, NotAuthorizedError } = require('../helpers/error')
const { User } = require('../service/schemas/users')

const register = async (req, res) => {
    const { email, password, subscription } = req.body
    const { error } = userValidSchema.validate(req.body, { context: { requestMethod: req.method } });

    if (error){
        throw new ValidationError(error.details[0].message)
    }

    try{
        const avatarURL = await gravatar.url(email);
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
    const avatarsDir = path.join(__dirname, "../../", "public", "avatars")
    const { path: tempUpload, originalname } = req.file

    try{
        const resultUpload = path.join(avatarsDir, originalname)
        await fs.rename(tempUpload, resultUpload)
        const avatarURL = path.join("public", "avatars", originalname)
        const result = await User.findByIdAndUpdate(req.user._id, { avatarURL })

        res.status(200).json({
            Status: 'OK',
            Code: 200,
            ResponseBody: { 
                avatarURL: result.avatarURL
            },
        })
    } catch (error){
        await fs.unlink(tempUpload)
        throw error
    }
}

module.exports = { register, login, logout, current, change, updateAvatar}