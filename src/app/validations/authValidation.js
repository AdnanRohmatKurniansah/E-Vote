import Joi from "joi"

export const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(150).required(),
    username: Joi.string().max(100).required(),
    dateBirth: Joi.date().required(),
    address: Joi.string().max(150).required(),
    role: Joi.string().required(),
    password: Joi.string().min(5).max(255).required(),
  })

  return schema.validate(data)
}