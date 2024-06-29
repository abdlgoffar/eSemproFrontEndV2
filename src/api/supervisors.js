



import axios from 'axios';

const url = "http://127.0.0.1:8000/api";



export const getAllSupervisors = async (token) => {
    try {
        const response = await axios.get(`${url}/supervisors/get/all`, {
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




export const getSupervisorProposal = async (token) => {
    try {
        const response = await axios.get(`${url}/supervisors/get/proposals`, {
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


export const getSupervisorProposalByProposalId = async (token, proposalId) => {
    try {
        const response = await axios.get(`${url}/supervisors/get/proposals/${proposalId}`, {
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

export const createProposalApprovalStatus = async (data, token, proposalId) => {
    try {
        const response = await axios.post(`${url}/supervisors/create/proposals/approval/${proposalId}`, data, {
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