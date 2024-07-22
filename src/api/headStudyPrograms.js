



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

export const getAllHeadStudyProgramExaminers = async (token, proposalId) => {
    try {
        const response = await axios.get(`${url}/head-study-programs/get/all/examiners/${proposalId}`, {
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


export const getHeadStudyProgramProposal = async (token, page) => {
    try {
        const response = await axios.get(`${url}/head-study-programs/get/proposals?page=${page}`, {
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

export const getHeadStudyProgramProposalHaveExaminers = async (token, page) => {
    try {
        const response = await axios.get(`${url}/head-study-programs/get/proposals/examiners?page=${page}`, {
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

export const updateProposalExaminer = async (data, token) => {
    try {
        const response = await axios.post(`${url}/head-study-programs/update/proposals/examiner`, data, {
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