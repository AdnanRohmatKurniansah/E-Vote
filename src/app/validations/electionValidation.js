import Joi from "joi"

export const validateElection = (data) => {
    const schema = Joi.object({
        election_name: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(5).max(255).required(),
        end_date: Joi.date().required(),
        status: Joi.string()
    })

    return schema.validate(data)
}