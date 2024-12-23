import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Helpers/Navbar";
import Sidebar from "../../Components/ACN/Sidebar";
import Button from "../../Components/Helpers/Button";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import { useState } from "react";
import { newFaq, updateFaq } from "../../Helpers/acn/api";
import toast from "react-hot-toast";
import ErrorCard from "../../Components/Helpers/ErrorCard";
import LoadingBtn from "../../Components/Helpers/LoadingBtn";
import { useFetchFaq } from "../../Helpers/acn/fetch.hooks";

function AcnFaqForm({ acnFaqId, setAcnFaqId }) {
    const navigate = useNavigate()
    const { data: educonnectfaq, isFetching } = useFetchFaq(acnFaqId)
    const faqData = educonnectfaq?.data || {}

    const [ formData, setFormData ] = useState({ id: acnFaqId ? acnFaqId : '' })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState()
    const handleSave = async () => {
        if(loading){
            return
        }
        if(!acnFaqId){
            if(!formData?.question){
                setError('Provide a Question')
                setTimeout(() => {
                    setError()
                }, 2500)
                return
            }
            if(!formData?.answer){
                setError('Provide a Answer')
                setTimeout(() => {
                    setError()
                }, 2500)
                return
            }
        }
        try {
            setLoading(true)
            const res = acnFaqId ? await updateFaq(formData) : await newFaq(formData)
            if(res?.success){
                toast.success(res?.data)
                navigate('/acn/faq')
            } else {
                toast.error(res?.data)
            }
        } catch (error) {
            console.log('object', error)
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className="page flex-row">
        {
            error && (
                <ErrorCard errorText={error} />
            )
        }

      {/* Sidebar */}
      <div className="fixed w-[280px] h-[100vh] left-0 top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="relative ml-[280px] w-[calc(100vw-280px)]">
        <div className=" w-full h-[60px] top-0 left-0 bg-white">
          <Navbar />
        </div>

        <div className="relative bg-bgColor pad1 flex flex-col gap-[39px]">
            <div className="flex flex-col gap-[39px] items-center">

              <DashBoardLinks name={'acn'} color={`text-acn-main-color border-acn-main-color`} />

                <div className="flex items-center justify-center gap-8 flex-col">
                    <h2 className="text-gray-900 text-[36px] font-semibold text-center">Frequently asked questions</h2>
                    <p className="text-gray-600 font-normal text-[20px] text-center">Everything you need to know about the Educonnect Africa</p>
                </div>
                
                <div className="flex w-[770px] flex-col gap-[30px]">
                    <div className=""></div>

                    <input id="question" defaultValue={faqData?.question} onChange={handleChange} className="input" />

                    <textarea id="answer" defaultValue={faqData?.answer} onChange={handleChange} className="input h-[176px] resize-none"></textarea>
                </div>

                <div className="w-[299px]">
                    {
                        loading ? (
                            <LoadingBtn style={`!bg-acn-main-color`} />
                        ) : (
                            <Button onCLick={handleSave} text={`Save`} style={`!bg-acn-main-color`}  />
                        )
                    }
                </div>

            </div>
        </div>


      </div>

    </div>
  );
}

export default AcnFaqForm;
