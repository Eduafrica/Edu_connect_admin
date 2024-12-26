import { useEffect, useState } from "react";
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
//axios.defaults.baseURL = 'https://edu-connect-admin-server.onrender.com/api'

//FETCH EDUCONNECT TESTIMONIALS
export function useFetchTestimonials(query){
    const { all, website, id } = query
    const [ testimonialsData, setTestimonialsData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchTestimonialsData = async () => {
            try {
                const { data, status} = all ? 
                    await axios.get(`/testimony/getAllTestimonies`, {withCredentials: true}) 
                    : website ? await axios.get(`/testimony/getSectionTestimonies/${id}`, {withCredentials: true})
                    : await axios.get(`/testimony/getATestimonies/${id}`, {withCredentials: true})
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
    }, [all, website, id])

    return testimonialsData
}

//FETCH NEWS LETTER
export function useFetchNewsLetter(query){
    const [ nesLetterData, setNewsLetterData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchNewsLetterData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/newsLetter/getNewsLetter`, {withCredentials: true}) : await axios.get(`/newsLetter/getANewsLetter/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setNewsLetterData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setNewsLetterData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setNewsLetterData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchNewsLetterData()
    }, [query])

    return nesLetterData
}