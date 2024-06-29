



import axios from 'axios';

const url = "http://127.0.0.1:8000/api";



export const getAllRooms = async (token) => {
    try {
        const response = await axios.get(`${url}/rooms/get/all`, {
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