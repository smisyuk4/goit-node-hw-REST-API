const { registerUser } = require('../service/userServices')

const { userValidSchema } = require('../service/schemas/userValidSchema')

const register = async (req, res, next) => {
    const { email, password, subscription } = req.body
  
    const { error } = userValidSchema.validate(req.body, { context: { requestMethod: req.method } });
  
    if (error){
      return res.status(400).json({
          status: 'error',
          code: 400,
          message: error.details[0].message,
        })  
      }
  
    try{
          const result = await registerUser({ email, password, subscription })
          res.status(201).json({
              status: 'created',
              code: 201,
              data: { user: result },
          })
      } catch (error){
          console.error(error)
          next(error)     
      } 
  }

  module.exports = { register }