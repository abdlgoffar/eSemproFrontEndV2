



import axios from 'axios';

const url = "http://127.0.0.1:8000/api";

export const order = async (data) => {
    try {
        const response = await axios.post(`${url}/users/order`, data, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post(`${url}/users/login`, data, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const get = async (token) => {
    try {
        const response = await axios.get(`${url}/users/get/current`, {
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


export const getUserUsername = async (token) => {
    try {
        const response = await axios.get(`${url}/users/get/username/current`, {
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

export const createHeadStudyProgram = async (data, token) => {
    try {
        const response = await axios.post(`${url}/users/head-study-programs/create`, data, {
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

export const createStudent = async (data, token) => {
    try {
        const response = await axios.post(`${url}/users/students/create`, data, {
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

export const createExaminer = async (data, token) => {
    try {
        const response = await axios.post(`${url}/users/examiners/create`, data, {
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


export const createCoordinator = async (data, token) => {
    try {
        const response = await axios.post(`${url}/users/coordinators/create`, data, {
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


export const createSupervisor = async (data, token) => {
    try {
        const response = await axios.post(`${url}/users/supervisors/create`, data, {
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


export const getUsersByRole = async (role, token) => {
    try {
        const response = await axios.get(`${url}/users/get/${role}`, {
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


