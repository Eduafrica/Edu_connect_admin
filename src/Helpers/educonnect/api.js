import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL


export async function replyMessage(formData) {
    try {
        const res = await axios.post('/educonnect/contactUs/replyMessage', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to reply user message'
        return res?.data
    }
}

//DELETE CONTACT US MESSAGE
export async function deleteMessage(formData) {
    try {
        const res = await axios.post('/educonnect/contactUs/deleteMessage', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete user message'
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

//TEAM
export async function newTeam(formData) {
    try {
        const res = await axios.post('/educonnect/team/newTeam', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to create new team'}
        return res?.data
    }
}

export async function editeam(formData) {
    try {
        const res = await axios.post('/educonnect/team/editeam', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update team'}
        return res?.data
    }
}

export async function toggleTeamActiveStatus({ id }) {
    try {
        const res = await axios.post('/educonnect/team/toggleActiveStatus', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update team status'}
        return res?.data
    }
}

export async function deleteTeamMember({ id }) {
    try {
        const res = await axios.post('/educonnect/team/deleteTeamMember', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to delete team'}
        return res?.data
    }
}