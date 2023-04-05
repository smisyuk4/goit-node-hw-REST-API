const Joi = require('joi');

const userValidSchema = Joi.object({
    password: Joi.string()
        .empty('')
        .min(6)
        .max(30)
        .required()
        .messages({
            'string.min': `password should have a minimum length of {#limit}`,
            'string.max': `password should have a maximum length of {#limit}`,
            'any.required': `missing required password field`
          }),

    email: Joi.string()
        .empty('')
        .min(6)
        .max(30)
        .email()
        .required()
        .messages({
            'string.min': `email should have a minimum length of {#limit}`,
            'string.max': `email should have a maximum length of {#limit}`,
            'string.email': `email field must be a valid`,
            'any.required': `missing required email field`
          }),

    subscription: Joi.string()
        .empty('')
})

const userVerifyEmail = Joi.object({
    email: Joi.string()
        .empty('')
        .min(6)
        .max(30)
        .email()
        .required()
        .messages({
            'string.min': `email should have a minimum length of {#limit}`,
            'string.max': `email should have a maximum length of {#limit}`,
            'string.email': `email field must be a valid`,
            'any.required': `missing required email field`
        }),
})

module.exports = {
    userValidSchema,
    userVerifyEmail,
}