import { useEffect, useState } from "react";
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

//FETCH EDUAFRICA TOP COURSE
export function useFetchTopCourseSearch(query){
    const [ topCourseData, setTopCourseData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchTopCourseData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/eduafrica/course/getTopSearchCourses`, {withCredentials: true}) : await axios.get(`/eduafrica/course/getTopSearchCourse/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setTopCourseData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setTopCourseData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setTopCourseData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchTopCourseData()
    }, [query])

    return topCourseData
}

//FETCH EDUAFRICA TOP CLICKED COURSE
export function useFetchTopClickedCourse(query){
    const [ topCourseData, setTopCourseData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchTopCourseData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/eduafrica/course/getTopClickedCourses`, {withCredentials: true}) : await axios.get(`/eduafrica/course/getTopClickedCourse/${query}`, {withCredentials: true})
                //console.log('Data from Hooks>>>', data, 'STATUS', status)

                if(status === 200){
                    setTopCourseData({ isFetching: false, data: data, status: status, serverError: null})
                } else{
                    setTopCourseData({ isFetching: false, data: null, status: status, serverError: null})
                }
            } catch (error) {
                setTopCourseData({ isFetching: false, data: null, status: null, serverError: error})
            }
        }
        fetchTopCourseData()
    }, [query])

    return topCourseData
}

//FETCH EDUCONNECT CONTACT US MESSAGE
export function useFetchContactMessage(query){
    const [ contactUsData, setContactUsData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchContactUsData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/eduafrica/contactUs/getAllContactUs`, {withCredentials: true}) : await axios.get(`/eduafrica/contactUs/getAContactUs/${query}`, {withCredentials: true})
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

//FETCH EDUAFRICA TEAM MEMBERS
export function useFetchTeamMembers(query){
    const [ teamMemberData, setTeamMemberData] = useState({ isFetching: true, data: null, status: null, serverError: null, })
    useEffect(() => {
        const fetchTeamMemberData = async () => {
            try {
                const { data, status} = !query ? await axios.get(`/eduafrica/team/getAdminAllTeam`, {withCredentials: true}) : await axios.get(`/eduafrica/team/getTeam/${query}`, {withCredentials: true})
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