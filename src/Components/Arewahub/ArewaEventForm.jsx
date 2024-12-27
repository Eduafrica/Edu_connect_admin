import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Helpers/Button";
import { useFetchEvents } from "../../Helpers/arewahub/fetch.hooks";
import { newEvent, updateEvent } from "../../Helpers/arewahub/api";
import Spinner from "../Helpers/Spinner";
import EventForm from "./EventForm";

function ArewaEventForm({ setSuccessMsg, setErrorMsg }) {
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[3]
    const { data: productData, isFetching } = useFetchEvents(pathName)
    const data = productData?.data
    useEffect(() => {
        if(data && data?.productId){
          setFormData({ _id: data?.productId }) 
        }
    }, [data, data?.productId])
    const [ formData, setFormData ] = useState({ id: pathName === 'noid' ? '' : pathName })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const [ submitting, setSubmitting ] = useState(false)
    const handleSubmitPost = async () => {
      if(submitting){
        return
      }
      if(pathName === 'noid'){
        if(!formData?.eventName){
          setErrorMsg('Event name is required')
          setTimeout(() => {
            setErrorMsg()
          }, 2500)
          return
        }
      }
      
      try {
        setSubmitting(true)

        const res = pathName === 'noid' ? await newEvent(formData) : await updateEvent(formData)
        if(res.success){
          setSuccessMsg(res.data)
          setTimeout(() => {
            setSuccessMsg()
          }, 2500)

          window.location.reload()
        } else {
          setErrorMsg(res.data)
          setTimeout(() => {
            setErrorMsg()
          }, 2500)
        }
      } catch (error) {
        
      } finally {
        setSubmitting(false)
      }
    }

  return (
    <div className="border-t-[12px] border-[1px] border-white shadow-sm flex flex-col gap-6 p-5 min-h-screen">
      {/**HEAD */}
      <div className="flex items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link to={`/arewahub/events`} className="flex items-center justify-center w-5 h-5">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#14142B]"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <h3 className="text-[18px] font-semibold text-[#14142B]">Add event</h3>
        </div>

        <div className="">
            <Button disabled={submitting} onCLick={handleSubmitPost} text={submitting ? `Adding Event...` : pathName === 'noid' ? `+ Add Event` : 'Update Event'} style={`!bg-arewahub-main-color !border-none !text-white flex items-center !gap-2 !min-w-[174px] !text-[16px] !font-semibold`} />
        </div>
      </div>

      {/**LINE */}
      <div className="flex w-full border-b-[1px] border-[#E6E6E6]"></div>

      <div className="flex items-stretch grow h-full">

        <div className="flex flex-col flex-[7]">
          {
            isFetching ? (
              <div className="">
                <Spinner />
              </div>
            ) : (
              <EventForm setErrorMsg={setErrorMsg} data={data} formData={formData} setFormData={setFormData} handleChange={handleChange} />

            )
          }
        </div>

        {/**
         * VERTICAL LINE 
        <div className="border-r-[1px] border-[#E6E6E6] mx-4"></div>
         * */}

        <div className="flex flex-col flex-[3] gap-[30px]">


        </div>

      </div>
    </div>
  );
}

export default ArewaEventForm;
