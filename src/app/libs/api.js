import axios from "axios"

export const listUser = async () => {
    try {
        const response = await axios.get('/api/auth')
        return response
    } catch (error) {
        return error
    }
}

export const registerUser = async (data) => {
    try {
        const response = await axios.post('/api/auth/register', data)
        return response
    } catch (error) {
        return error
    }
}

export const detailUser = async (id) => {
    try {
        const response = await axios.get(`/api/auth/user/${id}`)
        return response
    } catch (error) {
        return error
    }
}

export const updateUser = async (id, data) => {
    try {
        const response = await axios.put(`/api/auth/user/${id}`, data)
        return response
    } catch (error) {
        return error
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`/api/auth/user/${id}`)
        return response
    } catch (error) {
        return error
    }
}

export const loadElection = async () => {
    try {
        const response = await axios.get('/api/election')
        return response
    } catch (error) {
        return error
    }
}

export const deleteElection = async (id) => {
    try {
        const response = await axios.delete(`/api/election/${id}`)
        return response
    } catch (error) {
        return error
    }
}