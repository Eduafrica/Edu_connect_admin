import { useEffect, useState } from "react";
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

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

//FETCH AREWA HUB TEAM MEMBERS
export function useFetchTeamMembers(query){
    const [ teamMemberData, setTeamMemberData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchTeamMemberData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/arewahub/team/getAdminAllTeam`, {withCredentials: true}) : await axios.get(`/arewahub/team/getTeam/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setTeamMemberData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setTeamMemberData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setTeamMemberData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchTeamMemberData()
    }, [query])

    return teamMemberData
}

//FETCH AREWA HUB REVENUE AND ORDERS
export function useFetchRevenuesAndOrders(query){
    const [ revenueAndOrderData, setRevenueAndOrderData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchRevenueAndOrderData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/arewahub/orders/getRevenueAndOrder/${query}`, {withCredentials: true}) : await axios.get(`/arewahub/orders/getRevenueAndOrder/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setRevenueAndOrderData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setRevenueAndOrderData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setRevenueAndOrderData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchRevenueAndOrderData()
    }, [query])

    return revenueAndOrderData
}

//FETCH TOP SELLING COURSE
export function useFetchTopSellingCourse(query) {
    const [topSellingCourseData, setTopSellingCourseData] = useState({
        isFetching: true,
        data: null,
        status: null,
        serverError: null,
    });

    useEffect(() => {
        const fetchTopSellingProduct = async () => {
            try {
                // Log the query to see if it's being used
                console.log('Query:', query);

                const url = query 
                    ? `/arewahub/orders/getTopSellingProduct?query=${query}`
                    : `/arewahub/orders/getTopSellingProduct`;
                
                const { data, status } = await axios.get(url, { withCredentials: true });

                // Log the API response for debugging
                console.log('API Response:', { data, status });

                if (status === 200) {
                    setTopSellingCourseData({
                        isFetching: false,
                        data: data,
                        status: status,
                        serverError: null,
                    });
                } else {
                    setTopSellingCourseData({
                        isFetching: false,
                        data: null,
                        status: status,
                        serverError: 'Unexpected status code',
                    });
                }
            } catch (error) {
                console.error('Error fetching top selling product:', error);
                setTopSellingCourseData({
                    isFetching: false,
                    data: null,
                    status: null,
                    serverError: error.message || 'Unknown error',
                });
            }
        };

        fetchTopSellingProduct();
    }, [query]);

    return topSellingCourseData;
}

//FETCH AREWA HUB REVENUE AND ORDERS
export function useFetchLastestEvent(query){
    const [ latestEventData, setLatestEventData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchLatestEvents = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/arewahub/events/getLatestEvents`, {withCredentials: true}) : await axios.get(`/arewahub/events/getLatestEvents`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setLatestEventData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setLatestEventData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setLatestEventData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchLatestEvents()
    }, [query])

    return latestEventData
}
