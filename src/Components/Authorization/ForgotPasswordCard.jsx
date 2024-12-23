import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../Helpers/Button"
import LoadingBtn from "../Helpers/LoadingBtn"
import { forgotPassword } from "../../Helpers/api"
import toast from "react-hot-toast"

function ForgotPasswordCard({ setErrorText, setSuccessText, }) {
  const navigate = useNavigate()
    const [ formData, setFormData ] = useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const [ loading, setLoading ] = useState(false)
    const handleForgotPassword = async () => {
        if(!formData?.email){
            setErrorText('Enter email')
            setTimeout(() => {
                setErrorText()
            }, 2500)
            return
        }
        try {
            setLoading(true)
            const res = await forgotPassword(formData)
            if(res.success){
              toast.success(res.data)
              navigate('/resetPasswordSentSuccess')
            } else{
              setErrorText(res.data)
              setTimeout(() => {
                  setErrorText()
              }, 2500)
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="flex flex-col w-[574px] gap-[64px]" >
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-[30px] text-text-color font-bold">
            Forgot Password Request
        </h1>
        <p className="text-[16px] text-text-color-1 font-normal">
            Provide email address to process reset password request   
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="inputGroup">
            <label className="label">Email*</label>
            <input id="email" onChange={handleChange} type="email" className="input" placeholder="samadopabode@gmail.com"  />
        </div>

      </div>

      <div className="">
        {
            loading ? (
                <LoadingBtn />
            ) : (
                <div onClick={handleForgotPassword} className="">
                    <Button disabled={loading} onClick={handleForgotPassword} text={'Submit'} />
                </div>
            )
        }
      </div>

      <div className="text-xs font-medium text-text-color-3">
        Remeber password?  <Link to={`/`} className="font-bold text-edu-main-color">Login</Link>
      </div>

    </div>
  )
}

export default ForgotPasswordCard
