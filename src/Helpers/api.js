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