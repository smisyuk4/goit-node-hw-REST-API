const Joi = require('joi');

const schema = Joi.when(Joi.ref("$requestMethod"), {
  switch: [
    {
      is: "POST",
      then: Joi.object({
        name: Joi.string()
          .empty('')    
          .trim()
          .min(3)
          .max(30)
          .required(),

        email: Joi.string()
          .empty('')
          .trim()
          .min(6)
          .max(30)
          .email()
          .required(),

        phone: Joi.string().trim()
          .empty('')
          .trim()
          .min(6)
          .max(30)
          .pattern(/^[+]?\d{2,7}[(\- .\s]?\d{2,7}([)\- .\s]?\d{2,7})*$/)
          .required(),

        favorite: Joi.boolean(),
        }),
    },
    {
      is: "PUT",
      then: Joi.object({
        name: Joi.string()
          .empty('')    
          .trim()
          .min(3)
          .max(30),

        email: Joi.string()
          .empty('')
          .trim()
          .min(6)
          .max(30)
          .email(),

        phone: Joi.string().trim()
          .empty('')
          .trim()
          .min(6)
          .max(30)
          .pattern(/^[+]?\d{2,7}[(\- .\s]?\d{2,7}([)\- .\s]?\d{2,7})*$/),    
          
        favorite: Joi.boolean(),
      }),
    },
  ],
});

module.exports = {
    schema
}