const Joi = require('joi')

exports.createBody = Joi.object({
    name:Joi.string().required(),
    code:Joi.string().required(),
    quantity:Joi.number().required(),
    price:Joi.number().required(),
})

exports.updateBody = Joi.object({
    id:Joi.string().required(),

    name:Joi.string().required(),
    code:Joi.string().required(),
    quantity:Joi.number().required(),
    price:Joi.number().required(),
})