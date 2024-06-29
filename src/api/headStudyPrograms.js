



import axios from 'axios';

const url = "http://127.0.0.1:8000/api";



export const getAllHeadStudyProgram = async (token) => {
    try {
        const response = await axios.get(`${url}/head-study-programs/get/all`, {
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

export const getHeadStudyProgramProposal = async (token) => {
    try {
        const response = await axios.get(`${url}/head-study-programs/get/proposals`, {
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


export const getHeadStudyProgramProposalByProposalId = async (token, proposalId) => {
    try {
        const response = await axios.get(`${url}/head-study-programs/get/proposals/${proposalId}`, {
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


export const createProposalApprovalStatusRoomAndExaminer = async (data, token, proposalId) => {
    try {
        const response = await axios.post(`${url}/head-study-programs/create/proposals/approval/${proposalId}`, data, {
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