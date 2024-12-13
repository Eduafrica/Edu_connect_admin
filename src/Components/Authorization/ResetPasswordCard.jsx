import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../Helpers/Button"
import LoadingBtn from "../Helpers/LoadingBtn"
import { resetPassword } from "../../Helpers/api"

function ResetPasswordCard({ setErrorText, setSuccessText, }) {
    const [ formData, setFormData ] = useState({})
    const [ showPassword, setShowPassword ] = useState(false)
    const [ showConfirmPassword, setConfirmShowPassword ] = useState(false)

    
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleShowConfirmPassword = () => {
    setConfirmShowPassword((prev) => !prev)
  }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const [ loading, setLoading ] = useState(false)
    const handleResetPassword = async () => {
        if(!formData?.password){
            setErrorText('Enter password')
            setTimeout(() => {
                setErrorText()
            }, 2500)
            return
        }
        if(!formData?.confirmPassword){
            setErrorText('Enter confirm password')
            setTimeout(() => {
                setErrorText()
            }, 2500)
            return
        }
        try {
            setLoading(true)
            const res = await resetPassword(formData)
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="flex flex-col w-[574px] gap-[64px]" >
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-[30px] text-text-color font-bold">
            Reset your Educonnect account password
        </h1>
        <p className="text-[16px] text-text-color-1 font-normal">
            Enter new password and confirm to password to change your password
        </p>
      </div>

      <div className="flex flex-col gap-5">

        <div className="inputGroup">
            <label className="label">Password*</label>
            <div className="relative w-full">
                <input type={ showPassword ? 'text' : 'password' } id="password" onChange={handleChange} className="input" placeholder="samamd" />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={toggleShowPassword}>
                { showPassword ? 'hide' : 'show'}
                </span>
            </div>
        </div>

        <div className="inputGroup">
            <label className="label">Confirm Password*</label>
            <div className="relative w-full">
                <input type={ showConfirmPassword ? 'text' : 'password' } id="confirmPassword" onChange={handleChange} className="input" placeholder="samamd" />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={toggleShowConfirmPassword}>
                { showConfirmPassword ? 'hide' : 'show'}
                </span>
            </div>
        </div>

      </div>

      <div className="">
        {
            loading ? (
                <LoadingBtn />
            ) : (
                <div onClick={handleResetPassword} className="">
                    <Button onClick={handleResetPassword} text={'Reset Password'} />
                </div>
            )
        }
      </div>

      <div className="text-xs font-medium text-text-color-3">

      </div>

    </div>
  )
}

export default ResetPasswordCard
