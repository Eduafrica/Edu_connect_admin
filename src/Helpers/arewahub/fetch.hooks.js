import { useEffect, useState } from "react";
import axios from 'axios'

//axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
//axios.defaults.baseURL = 'https://apostle.onrender.com/api'
axios.defaults.baseURL = 'https://edu-connect-admin-server.onrender.com/api'

//FETCH AREWA HUB PRODUCTS
export function useFetchProducts(query){
    const [ donationData, setDonationData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchDonationData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/arewahub/product/products`, {withCredentials: true}) : await axios.get(`/arewahub/product/product/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setDonationData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setDonationData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setDonationData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchDonationData()
    }, [query])

    return donationData
}

//FETCH AREWA HUB ORDERS
export function useFetchOrders(query){
    const [ orderData, setOrderData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/arewahub/orders/fetAllOrders`, {withCredentials: true}) : await axios.get(`/arewahub/orders/fetchOrder/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setOrderData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setOrderData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setOrderData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchOrderData()
    }, [query])

    return orderData
}

//FETCH AREWA HUB EVENTS
export function useFetchEvents(query){
    const [ eventData, setEventsData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/arewahub/events/getEvents`, {withCredentials: true}) : await axios.get(`/arewahub/events/getEvent/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setEventsData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setEventsData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setEventsData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchEventsData()
    }, [query])

    return eventData
}

//FETCH AREWA HUB FAQ
export function useFetchFaq(query){
    const [ faqData, setFaqData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchFaqData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/arewahub/faq/getAllFaq`, {withCredentials: true}) : await axios.get(`/arewahub/faq/getAFaq/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setFaqData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setFaqData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setFaqData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchFaqData()
    }, [query])

    return faqData
}
//FETCH AREWA HUB CONTACT US
export function useFetchContactMessage(query){
    const [ contactUsData, setContactUsData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchContactUsData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/arewahub/contactUs/getAllContactUs`, {withCredentials: true}) : await axios.get(`/arewahub/contactUs/getAContactUs/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setContactUsData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setContactUsData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setContactUsData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchContactUsData()
    }, [query])

    return contactUsData
}