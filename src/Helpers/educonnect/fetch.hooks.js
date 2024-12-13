import { useEffect, useState } from "react";
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
//axios.defaults.baseURL = 'https://apostle.onrender.com/api'

//FETCH TESTIMONIALS
export function useFetchTestimonials(query){
    const [ testimonialsData, setTestimonialsData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchTestimonialsData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/educonnect/testimonies/getAllTestimonies`, {withCredentials: true}) : await axios.get(`/educonnect/testimonies/getATestimonies/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setTestimonialsData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setTestimonialsData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setTestimonialsData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchTestimonialsData()
    }, [query])

    return testimonialsData
}

//FETCH CONTACT US MESSAGE
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

//FETCH FAQ
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