
import axios from 'axios';

const url = "http://127.0.0.1:8000/api";



export const getAllCoordinators = async (token) => {
    try {
        const response = await axios.get(`${url}/coordinators/get/all`, {
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
        const response = await axios.get(`${url}/coordinators/get/invitation`, {
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
        const response = await axios.get(`${url}/coordinators/get/proposals`, {
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

export const getCoordinatorProposalByProposalId = async (token, proposalId) => {
    try {
        const response = await axios.get(`${url}/coordinators/get/proposals/${proposalId}`, {
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

export const createProposalAssessmentStatus = async (data, token, proposalId) => {
    try {
        const response = await axios.post(`${url}/coordinators/create/proposals/assessment/${proposalId}`, data, {
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