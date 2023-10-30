import Joi from "joi"

export const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(150).required(),
    username: Joi.string().max(100).required(),
    dateBirth: Joi.date().required(),
    address: Joi.string().max(150).required(),
    role: Joi.string(),
    password: Joi.string().min(5).max(255).required(),
  })

  return schema.validate(data)
}

export const validateLogin = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(150).required(),
    password: Joi.string().min(5).max(255).required()
  })

  return schema.validate(data)
}

export const validateUpdate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(150),
    username: Joi.string().max(100),
    dateBirth: Joi.date(),
    address: Joi.string().max(150),
    role: Joi.string(),
    password: Joi.string().min(5).max(255),
  })

  return schema.validate(data)
}