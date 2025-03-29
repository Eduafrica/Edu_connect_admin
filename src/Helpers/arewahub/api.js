import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

//REPLY CONTACT US MESSAGE
export async function replyMessage(formData) {
    try {
        const res = await axios.post('/arewahub/contactUs/replyMessage', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to reply user message'
        return res?.data
    }
}

//DELETE CONTACT US MESSAGE
export async function deleteMessage(formData) {
    try {
        const res = await axios.post('/arewahub/contactUs/deleteMessage', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete user message'
        return res?.data
    }
}

export async function newFaq(formData) {
    try {
        const res = await axios.post('/arewahub/faq/newFaq', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to add new FAQ'
        return res?.data
    }
}

export async function updateFaq(formData) {
    try {
        const res = await axios.post('/arewahub/faq/updateFaq', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to update FAQ'
        return res?.data
    }
}

export async function toggleFaqActive({ id }) {
    try {
        const res = await axios.post('/arewahub/faq/toggleFaqActive', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to update FAQ Status'
        return res?.data
    }
}

export async function deleteFaq({ id }) {
    try {
        const res = await axios.post('/arewahub/faq/deleteFaq', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete FAQ'
        return res?.data
    }
}

//PRODUCT
export async function newProduct(formData) {
    try {
        const res = await axios.post('/arewahub/product/newProduct', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to create new product'}
        return res?.data
    }
}

export async function updateProduct(formData) {
    try {
        const res = await axios.post('/arewahub/product/updateProduct', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update product'}
        return res?.data
    }
}

export async function deleteProduct({ id }) {
    try {
        const res = await axios.post('/arewahub/product/deleteProduct', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete product'
        return res?.data
    }
}

export async function toggleActive({ id }) {
    try {
        const res = await axios.post('/arewahub/product/toggleActive', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to toggle active status'
        return res?.data
    }
}

export async function toggleOrderActiveStatus({ id }) {
    try {
        const res = await axios.post('/arewahub/orders/approveOrderDelivered', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to toggle active status'
        return res?.data
    }
}

export async function togglePayment({ id }) {
    try {
        const res = await axios.post('/arewahub/orders/togglePayment', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to toggle payment status'
        return res?.data
    }
}

export async function deleteOrder({ id }) {
    try {
        const res = await axios.post('/arewahub/orders/deleteOrder', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete order'
        return res?.data
    }
}

//EVENTS
export async function newEvent(formDataToSend) {
    try {
        console.log('DATA FORM', formDataToSend)
        const res = await axios.post('/arewahub/events/newEvent', formDataToSend, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to create new event'
        return res?.data
    }
}

export async function updateEvent(formDataToSend) {
    try {
        const res = await axios.post('/arewahub/events/updateEvent', formDataToSend, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to update event'
        return res?.data
    }
}

export async function deleteEvent({ id }) {
    try {
        const res = await axios.post('/arewahub/events/deleteEvent', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to delete event'
        return res?.data
    }
}

export async function downloadPDF({ id }) {
    try {
        const res = await axios.post('/arewahub/becomeAMember/downloadPDF', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to download pdf'
        return res?.data
    }
}

export async function downloadCSV({ id }) {
    try {
        const res = await axios.post('/arewahub/becomeAMember/downloadCSV', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to download csv'
        return res?.data
    }
}

//TEAM
export async function newTeam(formData) {
    try {
        const res = await axios.post('/arewahub/team/newTeam', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to create new team'}
        return res?.data
    }
}

export async function editeam(formData) {
    try {
        const res = await axios.post('/arewahub/team/editeam', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update team'}
        return res?.data
    }
}

export async function toggleTeamActiveStatus({ id }) {
    try {
        const res = await axios.post('/arewahub/team/toggleActiveStatus', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to update team status'}
        return res?.data
    }
}

export async function deleteTeamMember({ id }) {
    try {
        const res = await axios.post('/arewahub/team/deleteTeamMember', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to delete team'}
        return res?.data
    }
}