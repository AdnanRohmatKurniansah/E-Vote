import jwt from "jsonwebtoken"

export const createSecretToken = (id, username, role) => {
    return jwt.sign({ id, username, role }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

export const createRefreshToken = (id, username, role) => {
    return jwt.sign({ id, username, role }, process.env.JWT_REFRESH, {
        expiresIn: '15d'
    })
}