import axios from "axios"

//axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
//axios.defaults.baseURL = 'https://eduafric.onrender.com/api'
axios.defaults.baseURL = 'https://edu-connect-admin-server.onrender.com/api'

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
        const res = await axios.post('/arewahub/product/newProduct', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || { data: 'Unable to create new product'}
        return res?.data
    }
}

export async function updateProduct(formData) {
    try {
        const res = await axios.post('/arewahub/product/updateProduct', formData, {withCredentials: true})
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
        const res = await axios.post('/arewahub/product/approveOrderDelivered', { id }, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to toggle active status'
        return res?.data
    }
}

//EVENTS
export async function newEvent(formData) {
    try {
        const res = await axios.post('/arewahub/events/newEvent', formData, {withCredentials: true})
        return res.data
    } catch (error) {
        const res = error.response || 'Unable to create new event'
        return res?.data
    }
}

export async function updateEvent(formData) {
    try {
        const res = await axios.post('/arewahub/events/updateEvent', formData, {withCredentials: true})
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
