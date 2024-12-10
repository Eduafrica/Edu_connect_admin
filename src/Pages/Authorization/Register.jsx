import { useState } from "react"
import Logo from "../../Components/Helpers/Logo"
import Swiper from "../../Components/Helpers/Swiper"
import ErrorCard from "../../Components/Helpers/ErrorCard"
import SuccessCard from "../../Components/Helpers/SuccessCard"
import RegisterCard from "../../Components/Authorization/RegisterCard"

function Register() {
    const [ errorText, setErrorText ] = useState()
    const [ successText, setSuccessText ] = useState()

  return (
    <div className="page flex-row">

      <div className="h-[100%] w-full flex flex-col items-center">
        <div className="flex flex-col items-start gap-[3rem] overflow-y-auto scrollbar-none">

            <Logo style={`mt-[50px]`} />

            <RegisterCard setErrorText={setErrorText} setSuccessText={setSuccessText} />

        </div>

      </div>

      <div className="w-[608px] min-h-[100vh]">
        <Swiper />
      </div>

      {
        errorText && (
            <ErrorCard errorText={errorText} />
        )}
    
        {
            successText && (
                <SuccessCard successText={successText} />
            )
        }

    </div>
  )
}

export default Register
