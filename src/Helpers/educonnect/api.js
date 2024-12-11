import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
//axios.defaults.baseURL = 'https://eduafric.onrender.com/api'

export async function register(formData) {
    try {
        const res = await axios.post('/auth/register', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to register user'
        return res?.data
    }
}

export async function verifyOtp({ otp }) {
    try {
        const res = await axios.post('/auth/verifyOtp', { otp }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to verify user OTP'
        return res?.data
    }
}

export async function resendOtp({ email }) {
    try {
        const res = await axios.post('/auth/resendOtp', { email }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to resend user OTP'
        return res?.data
    }
}

export async function login(formData) {
    try {
        const res = await axios.post('/auth/login', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to login user'
        return res?.data
    }
}

export async function forgotPassword(formData) {
    try {
        const res = await axios.post('/auth/forgotPassword', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function resetPassword(formData) {
    try {
        const res = await axios.post('/auth/resetPassword', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function updatePassword(formData) {
    try {
        const res = await axios.post('/auth/updatePassword', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function updateUser(formData) {
    try {
        const res = await axios.post('/auth/updateUser', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function toggleBlacklist({ id }) {
    try {
        const res = await axios.post('/educonnect/testimonies/toggleBlacklist', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function approveTestimony({ id }) {
    try {
        const res = await axios.post('/educonnect/testimonies/approveTestimony', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function deleteTestimony({ id }) {
    try {
        const res = await axios.post('/educonnect/testimonies/deleteTestimony', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

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