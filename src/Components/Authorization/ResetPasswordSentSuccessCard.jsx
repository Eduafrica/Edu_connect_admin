import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../Helpers/Button"
import LoadingBtn from "../Helpers/LoadingBtn"

function ResetPasswordSentSuccessCard({ setErrorText, setSuccessText, }) {
    const navigate = useNavigate()

    const [ loading, setLoading ] = useState(false)
    const handleRedirect = () => {
        const mailtoUrl = "mailto:"; 
        window.location.href = mailtoUrl;
    };

  return (
    <div className="flex flex-col w-[574px] gap-[64px]" >
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-[30px] text-text-color font-bold">
            Successful!
        </h1>
        <p className="text-[16px] text-text-color-1 font-normal">
            Your reset password requst has been successfull. Open you mail to get reset password link and proceed with password reset
        </p>
      </div>


      <div className="">
        {
            loading ? (
                <LoadingBtn />
            ) : (
              <div onClick={handleRedirect} className="">
                <Button onClick={handleRedirect} text={'Open main'} />
              </div>
            )
        }
      </div>


    </div>
  )
}

export default ResetPasswordSentSuccessCard
