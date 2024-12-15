import { useEffect, useState } from "react";
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
//axios.defaults.baseURL = 'https://apostle.onrender.com/api'

//FETCH EDUCONNECT CONTACT US MESSAGE
export function useFetchContactMessage(query){
    const [ contactUsData, setContactUsData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchContactUsData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/educonnect/contactUs/getAllContactUs`, {withCredentials: true}) : await axios.get(`/educonnect/contactUs/getAContactUs/${query}`, {withCredentials: true})
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

//FETCH EDUCONNECT FAQ
export function useFetchFaq(query){
    const [ faqData, setFaqData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchFaqData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/educonnect/faq/getAllFaq`, {withCredentials: true}) : await axios.get(`/educonnect/faq/getAFaq/${query}`, {withCredentials: true})
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
