import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NewsLetterForm from "./Helpers/NewsLetterForm";
import Button from "../Helpers/Button";
import { useFetchNewsLetter } from "../../Helpers/fetch.hooks";
import { editNewsLetter, newNewsletter } from "../../Helpers/api";
import toast from "react-hot-toast";
import Spinner from "../Helpers/Spinner";

function EduConnectNewsletterForm({ setSuccessMsg, setErrorMsg }) {
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[3]
    const { data: newsLetterData, isFetching } = useFetchNewsLetter(pathName)
    const data = newsLetterData?.data
    const [ formData, setFormData ] = useState({ id: pathName === 'noid' ? '' : pathName })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const [ submitting, setSubmitting ] = useState(false)
    const handleSubmitPost = async () => {
      if(submitting){
        return
      }
      try {
        setSubmitting(true)
        const res = pathName === 'noid' ? await newNewsletter(formData) : await editNewsLetter(formData)
        if(res.success){
          setSuccessMsg(res.data)
          setTimeout(() => {
            setSuccessMsg()
          }, 2500)
          window.location.reload()
        } else {
          setErrorMsg(res.data)
          toast.error(res.data)
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
          <Link to={`/acn/news-and-updates`} className="flex items-center justify-center w-5 h-5">
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
          <h3 className="text-[18px] font-semibold text-[#14142B]">Add Newsletter</h3>
        </div>

        <div className="">
            <Button disabled={submitting} onCLick={handleSubmitPost} text={submitting ? 'Publishing' : `Publish`} style={`!bg-main-color !text-white flex items-center !gap-2 !min-w-[174px] !text-[16px] !font-semibold`} />
        </div>
      </div>

      {/**LINE */}
      <div className="flex w-full border-b-[1px] border-[#E6E6E6]"></div>

      {
        isFetching ? (
          <div className="">
            <Spinner />
          </div>
        ) : (
          <div className="flex items-stretch grow h-full">

            <div className="flex flex-col flex-[7]">
                <NewsLetterForm data={data} formData={formData} setFormData={setFormData} handleChange={handleChange} />
            </div>

            {/**VERTICAL LINE */}
            <div className="border-r-[1px] border-[#E6E6E6] mx-4"></div>

            <div className="flex flex-col flex-[3] gap-[30px]">
              <div className="inputGroup">
                <label className="label">Author</label>
                <input id="author" defaultValue={data?.author} onChange={handleChange} placeholder="Enter writer's name" className="input" />
              </div>

              <div className="inputGroup">
                <label className="label">Redirection</label>
                <select defaultValue={data?.website} onChange={handleChange} className="input" name="" id="website">
                  <option name="" id="">Select Redirection</option>
                  <option value="educonnect" id="educonnect">Edu Connect</option>
                  <option value="eduafrica" id="eduafrica"> Edu Africa</option>
                  <option value="eduafrica" id="eduafricawaitlist"> Edu Africa Waitlist</option>
                  <option value="arewahub" id="arewahub">Arewa hub</option>
                  <option value="acn" id="acn">African Child Network</option>
                  <option value="all" id="all">All</option>
                </select>
              </div>

            </div>

          </div>
        )
      }

    </div>
  );
}

export default EduConnectNewsletterForm;
