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

export const onGoingElection = async () => {
    try {
        const response = await axios.get('/api/election/ongoing')
        return response
    } catch (error) {
        return error
    }
}

export const onGoingCandidate = async (electionId) => {
    try {
        const response = await axios.get(`/api/candidate/ongoing/${electionId}`)
        return response
    } catch (error) {
        return error
    }
}

export const checkHasVoted = async (data) => {
    try {
        const response = await axios.post('/api/vote/chosen', data)
        return response
    } catch (error) {
        return error
    }
}

export const addElection = async (data) => {
    try {
        const response = await axios.post(`/api/election`, data)
        return response
    } catch (error) {
        return error
    }
}

export const detailElection = async (id) => {
    try {
        const response = await axios.get(`/api/election/${id}`)
        return response
    } catch (error) {
        return error
    }
}

export const updateElection = async (id, data) => {
    try {
        const response = await axios.put(`/api/election/${id}`, data)
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

export const loadCandidate = async () => {
    try {
        const response = await axios.get(`/api/candidate`)
        return response
    } catch (error) {
        return error
    }
}

export const addCandidate = async (data) => {
    try {
        const response = await axios.post(`/api/candidate`, data)
        return response
    } catch (error) {
        return error
    }
}

export const detailCandidate = async (id) => {
    try {
        const response = await axios.get(`/api/candidate/${id}`)
        return response
    } catch (error) {
        return error
    }
}

export const updateCandidate = async (id, data) => {
    try {
        const response = await axios.put(`/api/candidate/${id}`, data)
        return response
    } catch (error) {
        return error
    }
}

export const deleteCandidate = async (id) => {
    try {
        const response = await axios.delete(`/api/candidate/${id}`)
        return response
    } catch (error) {
        return error
    }
}

export const addVote = async (data) => {
    try {
        const response = await axios.post('/api/vote', data)
        return response
    } catch (error) {
        return error
    }
}

export const getCandidateVoteCount = async (electionId, candidateId) => {
    try {
        const response = await axios.get(`/api/vote?electionId=${electionId}&candidateId=${candidateId}`)
        return response
    } catch (error) {
        return error
    }
}

export const closeElection = async (id) => {
    try {
        const response = await axios.put(`/api/election/close/${id}`)
        return response
    } catch (error) {
        return error
    }
}

export const loadWinner = async (electionId) => {
    try {
        const response = await axios.get(`/api/winner/${electionId}`)
        return response
    } catch (error) {
        return error
    }
}

export const listWinner = async () => {
    try {
        const response = await axios.get(`/api/winner`)
        return response
    } catch (error) {
        return error
    }
}

export const loadStats = async () => {
    try {
        const response = await axios.get('/api/stats')
        return response
    } catch (error) {
        return error
    }
}