import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Sidebar from "../../Components/ACN/Sidebar";
import { useFetchNewsAndUpdates } from "../../Helpers/acn/fetch.hooks";
import Stats from "../../Components/ACN/Stats";
import NewAndUpdatesCard from "../../Components/ACN/NewAndUpdatesCard";
import { newsandupdates } from "../../Data/newsandupdates";
import AcnNewsForm from "../../Components/ACN/AcnNewsForm";
import { useState } from "react";
import SuccessCard from "../../Components/Helpers/SuccessCard";
import ErrorCard from "../../Components/Helpers/ErrorCard";

function AcnNewsAndUpdatesForm() {
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

                <DashBoardLinks name={'acn'} color={`text-acn-main-color border-acn-main-color`} />

                <h1 className="title">
                  News and updates
                </h1>

            </div>

            {/**BOTTOM */}
            <div className="h-full">
                 <AcnNewsForm setErrorMsg={setErrorMsg} setSuccessMsg={setSuccessMsg} />
            </div>

        </div>


      </div>

    </div>
  );
}

export default AcnNewsAndUpdatesForm;
