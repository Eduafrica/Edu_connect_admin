import axios from "../BaseUrl"


export async function replyMessage(formData) {
    try {
        const res = await axios.post('/educonnect/contactUs/replyMessage', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to reply user message'
        return res?.data
    }
}

export async function newFaq(formData) {
    try {
        const res = await axios.post('/educonnect/faq/newFaq', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to add new FAQ'
        return res?.data
    }
}

export async function updateFaq(formData) {
    try {
        const res = await axios.post('/educonnect/faq/updateFaq', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to update FAQ'
        return res?.data
    }
}

export async function toggleFaqActive({ id }) {
    try {
        const res = await axios.post('/educonnect/faq/toggleFaqActive', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to update FAQ Status'
        return res?.data
    }
}

export async function deleteFaq({ id }) {
    try {
        const res = await axios.post('/educonnect/faq/deleteFaq', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete FAQ'
        return res?.data
    }
}