import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../Helpers/Button"
import LoadingBtn from "../Helpers/LoadingBtn"

function ResetPasswordSuccessCard({ setErrorText, setSuccessText, }) {
    const navigate = useNavigate()

    const [ loading, setLoading ] = useState(false)
    const handleRedirect = async () => {
        navigate('/')
    }

  return (
    <div className="flex flex-col w-[574px] gap-[64px]" >
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-[30px] text-text-color font-bold">
            Successful!
        </h1>
        <p className="text-[16px] text-text-color-1 font-normal">
            Your password has been created successfully on EduAfrica. You will be able to login with this password.
        </p>
      </div>


      <div className="">
        {
            loading ? (
                <LoadingBtn />
            ) : (
              <div onClick={handleRedirect} className="">
                <Button onClick={handleRedirect} text={'Continue'} />
              </div>
            )
        }
      </div>


    </div>
  )
}

export default ResetPasswordSuccessCard
