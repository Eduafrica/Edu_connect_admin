import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../Helpers/Button"
import LoadingBtn from "../Helpers/LoadingBtn"
import { register } from "../../Helpers/api"

function RegisterCard({ setErrorText, setSuccessText, }) {
  const navigate = useNavigate()
    const [ formData, setFormData ] = useState({})
    const [ showPassword, setShowPassword ] = useState(false)
    
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const [ loading, setLoading ] = useState(false)
    const handleRegister = async () => {
      if(!formData?.firstName){
        setErrorText('Enter first name')
        setTimeout(() => {
            setErrorText()
        }, 2500)
        return
    }
    if(!formData?.lastName){
      setErrorText('Enter last name')
      setTimeout(() => {
          setErrorText()
      }, 2500)
      return
  }
      if(!formData?.email){
        setErrorText('Enter email')
        setTimeout(() => {
            setErrorText()
        }, 2500)
        return
    }
    if(!formData?.password){
      setErrorText('Enter password')
      setTimeout(() => {
          setErrorText()
      }, 2500)
      return
  }
        try {
            setLoading(true)
            const res = await register(formData)
            if(res.success){
              setSuccessText('')
              setTimeout(() => {
                setSuccessText()
              }, 2500)

              navigate('/verifyOtp', {
                state: { email: res.email },
              });
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

  return (
    <div className="flex flex-col w-[574px] gap-[64px]" >
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-[30px] text-text-color font-bold">
            Create an EduAfrica Admin account
        </h1>
        <p className="text-[16px] text-text-color-1 font-normal">
            Get started to management of your student, instructor and <br /> organization  
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="inputGroup">
            <label className="label">First Name*</label>
            <input id="firstName" onChange={handleChange} type="text" className="input" placeholder="samadopabode@gmail.com"  />
        </div>

        <div className="inputGroup">
            <label className="label">Last Name*</label>
            <input id="lastName" onChange={handleChange} type="text" className="input" placeholder="samadopabode@gmail.com"  />
        </div>

        <div className="inputGroup">
            <label className="label">Email*</label>
            <input id="email" onChange={handleChange} type="email" className="input" placeholder="samadopabode@gmail.com"  />
        </div>

        <div className="inputGroup">
            <label className="label">Password*</label>
            <div className="relative w-full">
                <input type={ showPassword ? 'text' : 'password' } id="password" onChange={handleChange} className="input" placeholder="samamd" />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={toggleShowPassword}>
                { showPassword ? 'hide' : 'show'}
                </span>
            </div>
            <Link to={`/forgot-password`} className="text-sm font-normal text-error text-[14px]">Forgot password</Link>
        </div>

      </div>

      <div className="">
        {
            loading ? (
                <LoadingBtn />
            ) : (
              <div onClick={handleRegister} className="">
                <Button onClick={handleRegister} text={'Get Started'} />
              </div>
            )
        }
      </div>

      <div className="text-xs font-medium text-text-color-3 mb-[2rem]">
        Already have an account?  <Link to='/' className="font-bold text-edu-main-color">Sign in</Link>
      </div> 

    </div>
  )
}

export default RegisterCard
