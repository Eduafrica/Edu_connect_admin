import { useState } from "react"
import toast from "react-hot-toast"
import { FiMoreVertical } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { deleteFaq } from "../../Helpers/educonnect/api"
import Spinner from "../Helpers/Spinner"

function FaqCard({ data, setEduconnectFaqId, loading: loadingData }) {
    const navigate = useNavigate()
    const [ current, setCurrent ] = useState()
    const [ showMoreCard, setShowMoreCard ] = useState(false)
    const [ cardId, setCardId ] = useState()

    const handleCurrent = (id) => {
        if(current === id){
            setCurrent()
            return
        }
        setCurrent(id)
    }

    const toggleShowCard = (id) => {
        setCardId(id)
        setShowMoreCard((prev) => !prev)
    }

    const handleNavigate = (id) => {
        if(id){
            setEduconnectFaqId(id)
            navigate('/edu-connect/faq/faq-form')
        } else {
            setEduconnectFaqId()
            navigate('/edu-connect/faq/faq-form')
        }
    }

    const [ loading, setLoading ] = useState(false)
    const handleToggleActive = async (id) => {
        if(!loading){
            return
        }
        try {
            setLoading(true)
            const res = await toggleFaqActive({ id: id })
            if(res.success){
                toast.success(res.data)
                window.location.reload()
            } else {
                toast.error(res.data || 'Unable to update FAQ Status')
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteFaq = async (id) => {
        if(!loading){
            return
        }
        const confirm = window.confirm('Are you sure you want to delete this Question?')
        if(confirm){
            try {
                setLoading(true)
                const res = await deleteFaq({ id: id })
                if(res.success){
                    toast.success(res.data)
                    window.location.reload()
                } else {
                    toast.error(res.data || 'Unable to delete FAQ')
                }
            } catch (error) {
                
            } finally {
                setLoading(false)
            }
        }
    }

  return (
    <div className="w-full flex flex-col gap-8">
      {
        loadingData ? (
            <div className="flex items-center justify-center">
                <Spinner />
            </div>
        ) : 
        data?.map((i, idx) => (
            <div onClick={() => handleCurrent(idx)} className="relative pb-4 flex flex-col gap-2 border-b-[1px] border-gray-200 last:border-b-[0px] cursor-pointer">
                <div className="flex items-start gap-3 justify-between">
                    <h2 className="text-lg font-medium text-gray-900 flex-[7]">{i.question}</h2>
                   
                    <div className="flex items-start justify-start gap-4 ml-auto flex-[1]">

                        <div className="flex w-fit">
                            {
                                current === idx ? (
                                    <span className="flex items-center justify-center w-5 h-5">
                                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center w-5 h-5">
                                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                )
                            }
                        </div>

                        <div className={`py-[5px] px-[10px] rounded-[100px] text-sm font-normal flex items-center justify-center text-center ${ i.active ? 'bg-[#05A75312] text-[#05A753]' : 'bg-[#FEF3F2] text-[#D92D20]'}`}>
                            { i.active ? 'Active' : 'Inactive' }
                        </div>
                    </div>

                    <div onClick={() => toggleShowCard(idx)} className="cursor-pointer">
                        <FiMoreVertical />
                        
                    </div>

                    {/**POPUP MODAL */}
                    {
                        showMoreCard && cardId === idx && (
                            <div className="absolute min-w-[115px] z-50 top-6 right-[-1rem] flex flex-col bg-white border-[1px] border-gray-200 shadow-lg rounded-[8px] opacity-0 opacity-100 transition-opacity duration-300">
                                <p onClick={() => handleNavigate(i._id)} className="py-[9px] px-[10px] font-normal text-[14px] text-[#585858]">View</p>
                                <p onClick={() => handleNavigate(i._id)} className="py-[9px] px-[10px] font-normal text-[14px] text-[#585858]">Edit</p>
                                <p onClick={() => handleToggleActive(i._id)} className="py-[9px] px-[10px] font-normal text-[14px] text-[#585858]">{ i.active ? 'Make Inactive' : 'Make Active' }</p>
                                <p onClick={() => handleDeleteFaq(i._id)} className="py-[9px] px-[10px] font-normal text-[14px] text-[#F81414]">Delete</p>
                            </div>
                        )
                    }
                </div>
                
                {
                    current === idx && (
                        <div className="text-[16px] text-gray-600 font-normal">
                            {i.answer}
                        </div>
                    )
                }
            </div>
        ))
      }
    </div>
  )
}

export default FaqCard
