import Joi from "joi"

export const validateVote = (data) => {
    const schema = Joi.object({
        electionId: Joi.string().required(),
        candidateId: Joi.string().required()
    })

    return schema.validate(data)
}