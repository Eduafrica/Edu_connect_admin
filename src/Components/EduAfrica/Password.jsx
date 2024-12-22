import { useState } from "react"
import Button from "../Helpers/Button"
import LoadingBtn from "../Helpers/LoadingBtn"
import { useNavigate } from "react-router-dom"
import { updatePassword } from "../../Helpers/api"

function Password({ setErrorText, setSuccessMsg }) {
    const navigate = useNavigate()
    const [ formData, setFormData ] = useState({})
    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const [ loading, setLoading ] = useState(false)
    const handleUpdatePassword = async () => {
        if(!formData?.currentPassword){
            setErrorText('Enter Current Password')
            setTimeout(() => {
                setErrorText()
            }, 2500)
            return
        }
        if(!formData?.password){
            setErrorText('Enter New Password')
            setTimeout(() => {
                setErrorText()
            }, 2500)
            return
        }
        if(!formData?.confirmPassword){
            setErrorText('Confirm new password')
            setTimeout(() => {
                setErrorText()
            }, 2500)
            return
        }
        try {
            setLoading(true)
            const res = await updatePassword(formData)
            if(res.success){
                setSuccessMsg(res?.data || 'Password Change')
                setTimeout(() => {
                    setSuccessMsg()
                }, 2500)
            } else {
                setErrorText(res.data)
                setTimeout(() => {
                    setErrorText()
                }, 2500)
                return
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        navigate(-1);
    }
  return (
    <div className="relative px-4 py-5 rounded-t-[12px] border-[1px] border-white bg-white shadow-sm flex flex-col gap-16">
        <div className="flex mt-8 items-start gap-4 justify-between border-b-[1px] border-[#EAECF0] pb-4">
            <div className="flex flex-col gap-1">
                <h3 className="text-[18px] font-semibold text-[#101828]">Password</h3>
                <p className="text-[14px] font-normal text-[#475467]">Please enter your current password to change your password.</p>
            </div>
        </div>

        <div className="flex items-start gap-8 border-b-[1px] pb-4">
            <div className="w-[280px] flex flex-col">
                <p className="text-[14px] text-[#344054] font-medium">Current password</p>
            </div>
            <div className="flex items-center gap-6 w-[512px]">
                <input onChange={handleChange} id="currentPassword" placeholder="******" type="text" className="input" />
            </div>
        </div>

        <div className="flex items-start gap-8 border-b-[1px] pb-4">
            <div className="w-[280px] flex flex-col">
                <p className="text-[14px] text-[#344054] font-medium">New password</p>
            </div>
            <div className="flex flex-col items-center gap-6 w-[512px]">
                <input onChange={handleChange} id="password" placeholder="******" type="text" className="input" />
                <p className="text-[13px] font-normal text-[#475467]">New password must be contain atleast one special character and 8 character in lenght.</p>
            </div>
        </div>

        <div className="flex items-start gap-8 border-b-[1px] pb-4">
            <div className="w-[280px] flex flex-col">
                <p className="text-[14px] text-[#344054] font-medium">Confirm new password</p>
            </div>
            <div className="flex items-center gap-6 w-[512px]">
                <input onChange={handleChange} id="confirmPassword" placeholder="******" type="text" className="input" />
            </div>
        </div>

        <div className="flex items-center justify-end">
            <div className="flex items-center gap-5">
                {
                    loading ? (
                        <LoadingBtn />
                    ) : (
                        <>
                            <Button text={`Cancel`} onCLick={handleBack} style={`!bg-white !text-[#344054] !border-[#344054]`} />
                            <Button onCLick={handleUpdatePassword} text={`Update password`} style={`min-w-[180px]`} />
                        </>
                    )
                }
            </div>
        </div>

    </div>
  )
}

export default Password
