import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

export async function replyMessage(formData) {
    try {
        const res = await axios.post('/eduafrica/contactUs/replyMessage', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to reply user message'
        return res?.data
    }
}

//DELETE CONTACT US MESSAGE
export async function deleteMessage(formData) {
    try {
        const res = await axios.post('/eduafrica/contactUs/deleteMessage', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete user message'
        return res?.data
    }
}

//TEAM
export async function newTeam(formData) {
    try {
        const res = await axios.post('/eduafrica/team/newTeam', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to create new team'}
        return res?.data
    }
}

export async function editeam(formData) {
    try {
        const res = await axios.post('/eduafrica/team/editeam', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update team'}
        return res?.data
    }
}

export async function toggleTeamActiveStatus({ id }) {
    try {
        const res = await axios.post('/eduafrica/team/toggleActiveStatus', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update team status'}
        return res?.data
    }
}

export async function deleteTeamMember({ id }) {
    try {
        const res = await axios.post('/eduafrica/team/deleteTeamMember', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to delete team'}
        return res?.data
    }
}