

import axios from 'axios';

const url = "http://127.0.0.1:8000/api";


export const getStudents = async (token, room_id) => {
    try {
        const response = await axios.get(`${url}/academic-administrations/get/students/${room_id}`, {
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



export const createInvitation = async (form, token) => {
    try {
        const response = await axios.post(`${url}/academic-administrations/create/invitation`, form, {
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

export const rollbackCreateInvitation = async (token, invitation_id) => {
    try {
        const response = await axios.delete(`${url}/academic-administrations/create/invitation/rollback/${invitation_id}`, {
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

export const createProposalInvitation = async (data, token, invitation_id) => {
    try {
        const response = await axios.post(`${url}/academic-administrations/create/proposal/invitation/${invitation_id}`, data, {
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