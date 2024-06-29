




import axios from 'axios';

const url = "http://127.0.0.1:8000/api";

export const createStudentsSupervisors = async (data, token, proposalId) => {
    try {
        const response = await axios.post(`${url}/create/students/supervisors/${proposalId}`, data, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getInvitations = async (token) => {
    try {
        const response = await axios.get(`${url}/students/get/invitation`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getProposals = async (token) => {
    try {
        const response = await axios.get(`${url}/students/get/proposals`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getStudentProposalByProposalId = async (token, proposalId) => {
    try {
        const response = await axios.get(`${url}/students/get/proposals/${proposalId}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const revisionProposal = async (data, token, proposalId) => {
    try {
        const response = await axios.post(`${url}/students/revision/${proposalId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

