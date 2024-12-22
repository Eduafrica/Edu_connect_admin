import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import Sidebar from "../../Components/Arewahub/Sidebar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SuccessCard from "../../Components/Helpers/SuccessCard";
import ErrorCard from "../../Components/Helpers/ErrorCard";
import ArewaEventForm from "../../Components/Arewahub/ArewaEventForm";


function ArewaHubNewEvent() {
    const loc = useLocation()

    const [ successMsg, setSuccessMsg ] = useState()
    const [ errorMsg, setErrorMsg ] = useState()


  return (
    <div className="page flex-row">
              {
        successMsg && (
          <SuccessCard successText={successMsg} />
        )
      }

      {
        errorMsg && (
          <ErrorCard errorText={errorMsg} />
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
            <div className="flex flex-col gap-[30px]">

              <DashBoardLinks name={'arewahub'} color={`text-arewahub-main-color border-arewahub-main-color`} />

                <h1 className="title">
                    Events
                </h1>

                <div className="">
                </div>

            </div>


            <div className="">
                {/**ADD HERE */}
                <ArewaEventForm setErrorMsg={setErrorMsg} setSuccessMsg={setSuccessMsg}  />
            </div>

        </div>


      </div>

    </div>
  );
}

export default ArewaHubNewEvent;
