import axios from 'axios';

const url = "http://127.0.0.1:8000/api";

export const createProposal = async (form, token) => {
    try {
        const response = await axios.post(`${url}/proposals/create`, form, {
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

export const rollbackCreateProposal = async (token, proposal_id) => {
    try {
        const response = await axios.delete(`${url}/proposals/create/rollback/${proposal_id}`, {
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


export const getProposalPdf = async (id, token) => {
    try {
        const response = await axios.get(`${url}/proposals/get/pdf/${id}`, {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}