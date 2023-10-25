import Joi from "joi"

export const validateCandidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(5).max(255).required(),
        foto: Joi.any(),
        electionId: Joi.string().required()
    })

    return schema.validate(data)
}