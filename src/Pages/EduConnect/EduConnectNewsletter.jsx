import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Sidebar from "../../Components/EduConnect/Sidebar";
import { useFetchNewsAndUpdates } from "../../Helpers/acn/fetch.hooks";
import { newsandupdates } from "../../Data/newsandupdates";
import { useState } from "react";
import SuccessCard from "../../Components/Helpers/SuccessCard";
import ErrorCard from "../../Components/Helpers/ErrorCard";
import EduConnectNewsletterForm from "../../Components/EduConnect/EduConnectNewsletterForm";

function EduConnectNewsletter() {
  const { data: newsAndUpdateData, isFetching } = useFetchNewsAndUpdates()
  const data = newsAndUpdateData?.data || newsandupdates || []
  
  const [ successMsg, setSuccessMsg ] = useState()
  const [ errorMsg, setErrorMsg ] = useState()

  return (
    <div className="page flex-row h-full relative">

      {
        successMsg && (
          <SuccessCard successText={setSuccessMsg} />
        )
      }

      {
        errorMsg && (
          <ErrorCard errorMsg={errorMsg} />
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

        <div className="bg-bgColor pad1 flex flex-col gap-[30px]">
            {/**TOP */}
            <div className="flex flex-col gap-[30px]">

            <DashBoardLinks name={'educonnect'} color={`text-edu-main-color border-edu-main-color`} />

                <h1 className="title">
                  Newsletter
                </h1>

            </div>

            {/**BOTTOM */}
            <div className="h-full">
                 <EduConnectNewsletterForm setErrorMsg={setErrorMsg} setSuccessMsg={setSuccessMsg} />
            </div>

        </div>


      </div>

    </div>
  );
}

export default EduConnectNewsletter;
