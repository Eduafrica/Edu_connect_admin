import axios from "axios"

//axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
//axios.defaults.baseURL = 'https://edu-connect-admin-server.onrender.com/api'
axios.defaults.baseURL = 'https://edu-connect-admin-server.onrender.com/api'

export async function register(formData) {
    try {
        const res = await axios.post('/admin/register', formData, {withCredentials: true})
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
        const res = await axios.post('/admin/resendOtp', { email }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to resend user OTP'
        return res?.data
    }
}

export async function login(formData) {
    try {
        const res = await axios.post('/admin/login', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to login user'
        return res?.data
    }
}

export async function forgotPassword(formData) {
    try {
        const res = await axios.post('/admin/forgotPassword', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function resetPassword(formData) {
    try {
        const res = await axios.post('/admin/resetPassword', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function updatePassword(formData) {
    try {
        const res = await axios.post('/admin/updatePassword', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function updateUser(formData) {
    try {
        const res = await axios.post('/admin/editProfile', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function logout() {
    try {
        const res = await axios.post('/admin/logout', {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}


export async function toggleBlacklist({ id }) {
    try {
        const res = await axios.post('/testimony/toggleBlacklist', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function toggleApproveTestimony({ id }) {
    try {
        const res = await axios.post('/testimony/toggleApproveTestimony', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}

export async function deleteTestimony({ id }) {
    try {
        const res = await axios.post('/testimony/deleteTestimony', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to process request'
        return res?.data
    }
}