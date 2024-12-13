import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../Helpers/Button"
import LoadingBtn from "../Helpers/LoadingBtn"
import { login } from "../../Helpers/api"
import { signInSuccess } from "../../Redux/Admin/adminSlice"
import { useDispatch } from "react-redux"

function LoginCard({ setErrorText, setSuccessText, }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ formData, setFormData ] = useState({})
    const [ showPassword, setShowPassword ] = useState(false)
    
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const [ loading, setLoading ] = useState(false)
    const handleLogin = async () => {
      //console.log('object')
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
            const res = await login(formData)
            if(res.verified === false){
              setSuccessText(res.data)
              setTimeout(() => {
                setSuccessText()
              }, 2500)

              navigate('/verifyOtp')
            }else if(res.success && res.verified){
              setSuccessText(res.msg)
              setTimeout(() => {
                setSuccessText()
              }, 2500)

              localStorage.setItem('educonnecttoken', res?.token)
              dispatch(signInSuccess(res?.data))
              navigate('/edu-connect/dashboard')
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
            Welcome to Educonnect
        </h1>
        <p className="text-[16px] text-text-color-1 font-normal">
            Sign in with Staff ID or Phone number   
        </p>
      </div>

      <div className="flex flex-col gap-5">
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
              <div onClick={handleLogin} className="">
                <Button onClick={handleLogin} text={'Get Started'} />
              </div>
            )
        }
      </div>

      <div className="text-xs font-medium text-text-color-3">
        You don’t have an account?  <Link to={`/register`} className="font-bold text-edu-main-color">Become an Educonnect Africa</Link>
      </div>

    </div>
  )
}

export default LoginCard
