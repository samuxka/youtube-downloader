import axios from "axios";

const API_URL = 'http://localhost:5000'

export const fetchVideoDetails = async (url: string) => {
    const response = await axios.post(`${API_URL}/video-details`, { url })
    return response.data;
}

export const downloadVideo = async (url: string, format: string) => {
    const response = await axios.post(
        `${API_URL}/download`,
        { url, format },
        { responseType: 'blob' }
    )
    return response.data;
}