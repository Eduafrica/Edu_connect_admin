import axios from "../BaseUrl"

export async function replyMessage(formData) {
    try {
        const res = await axios.post('/eduafrica/contactUs/replyMessage', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to reply user message'
        return res?.data
    }
}