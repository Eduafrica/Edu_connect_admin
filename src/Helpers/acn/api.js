import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

//REPLY CONTACT US MESSAGE
export async function replyMessage(formData) {
    try {
        const res = await axios.post('/acn/contactUs/replyMessage', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to reply user message'
        return res?.data
    }
}

//DELETE CONTACT US MESSAGE
export async function deleteMessage(formData) {
    try {
        const res = await axios.post('/acn/contactUs/deleteMessage', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete user message'
        return res?.data
    }
}

export async function newFaq(formData) {
    try {
        const res = await axios.post('/acn/faq/newFaq', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to add new FAQ'
        return res?.data
    }
}

export async function updateFaq(formData) {
    try {
        const res = await axios.post('/acn/faq/updateFaq', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to update FAQ'
        return res?.data
    }
}

export async function toggleFaqActive({ id }) {
    try {
        const res = await axios.post('/acn/faq/toggleFaqActive', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to update FAQ Status'
        return res?.data
    }
}

export async function deleteFaq({ id }) {
    try {
        const res = await axios.post('/acn/faq/deleteFaq', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete FAQ'
        return res?.data
    }
}

export async function toggleNewsAndUpdateActiveState({ id }) {
    try {
        const res = await axios.post('/acn/newsAndUpdates/toggleActive', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to toggle newsletter active state'
        return res?.data
    }
}

export async function deleteNewsAndUpdate({ id }) {
    try {
        const res = await axios.post('/acn/newsAndUpdates/deleteNewsAndUpdate', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete newsletter'
        return res?.data
    }
}

export async function newNewsAndUpdate(formData) {
    try {
        const res = await axios.post('/acn/newsAndUpdates/newNews', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to create newsletter'}
        return res?.data
    }
}

export async function updateNewsAndUpdate(formData) {
    try {
        const res = await axios.post('/acn/newsAndUpdates/updateNews', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update newsletter'}
        return res?.data
    }
}

//TEAM
export async function newTeam(formData) {
    try {
        const res = await axios.post('/acn/team/newTeam', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to create new team'}
        return res?.data
    }
}

export async function editeam(formData) {
    try {
        const res = await axios.post('/acn/team/editeam', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update team'}
        return res?.data
    }
}

export async function toggleTeamActiveStatus({ id }) {
    try {
        const res = await axios.post('/acn/team/toggleActiveStatus', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update team status'}
        return res?.data
    }
}

export async function deleteTeamMember({ id }) {
    try {
        const res = await axios.post('/acn/team/deleteTeamMember', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to delete team'}
        return res?.data
    }
}

//DONATIONS
export async function toggleDonationActiveStatus({ id }) {
    try {
        const res = await axios.post('/acn/donation/toggleActiveStatus', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update donation status'}
        return res?.data
    }
}

export async function deleteDonation({ id }) {
    try {
        const res = await axios.post('/acn/donation/deleteDonation', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update donation status'}
        return res?.data
    }
}

//STORIES
export async function toggleStoryActiveState({ id }) {
    try {
        const res = await axios.post('/acn/story/toggleActive', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to toggle story active state'
        return res?.data
    }
}

export async function deleteStory({ id }) {
    try {
        const res = await axios.post('/acn/story/deleteStory', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete story'
        return res?.data
    }
}

export async function newStory(formData) {
    try {
        const res = await axios.post('/acn/story/newStory', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to create story'}
        return res?.data
    }
}

export async function updateStory(formData) {
    try {
        const res = await axios.post('/acn/story/updateStory', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update story'}
        return res?.data
    }
}

//AMBASSADOR
export async function newAmbassdor(formData) {
    try {
        const res = await axios.post('/acn/ambassdor/newTeam', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to create new ambassdor'}
        return res?.data
    }
}

export async function editAmbassdor(formData) {
    try {
        const res = await axios.post('/acn/ambassdor/editeam', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update ambassdor'}
        return res?.data
    }
}

export async function toggleAmbassdorActiveStatus({ id }) {
    try {
        const res = await axios.post('/acn/ambassdor/toggleActiveStatus', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update ambassdor status'}
        return res?.data
    }
}

export async function deleteAmbassdor({ id }) {
    try {
        const res = await axios.post('/acn/ambassdor/deleteTeamMember', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to delete ambassdor'}
        return res?.data
    }
}
