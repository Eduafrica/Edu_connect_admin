import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
//axios.defaults.baseURL = 'https://eduafric.onrender.com/api'

export async function replyMessage(formData) {
    try {
        const res = await axios.post('/eduafrica/contactUs/replyMessage', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to reply user message'
        return res?.data
    }
}