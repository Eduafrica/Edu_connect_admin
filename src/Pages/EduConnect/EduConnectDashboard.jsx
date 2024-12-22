import Navbar from "../../Components/Helpers/Navbar";
import Sidebar from "../../Components/EduConnect/Sidebar";
import Stats from "../../Components/EduConnect/Stats";
import TestimoniesCard from "../../Components/EduConnect/TestimoniesCard";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import { useFetchContactMessage } from "../../Helpers/educonnect/fetch.hooks";
import ContactUsCard from "../../Components/EduConnect/ContactUsCard";
import Graph from "../../Components/EduConnect/Graph";
import { useState } from "react";

function EduConnectDashboard() {
  const { data: contactUsData, isFetching } = useFetchContactMessage()
  const data = contactUsData?.data || []
  const spliceData = data?.splice(0, 5)

  const [ selectedDateValue, setSelectedDateValue ] = useState()
  return (
    <div className="page flex-row">

      {/* Sidebar */}
      <div className="fixed w-[280px] h-[100vh] left-0 top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="relative ml-[280px] w-[calc(100vw-280px)]">
        <div className=" w-full h-[60px] top-0 left-0 bg-white">
          <Navbar />
        </div>

        <div className="bg-bgColor pad1 flex flex-col gap-[39px]">
            <div className="flex flex-col gap-[30px]">

              <DashBoardLinks name={'educonnect'} color={`!text-edu-main-color border-edu-main-color`} />

                <h1 className="title">
                  Dashboard
                </h1>

                <div className="">
                  <Stats />
                </div>

                <Graph selectedDateValue={selectedDateValue} setSelectedDateValue={setSelectedDateValue} />

            </div>

            <div className="mt-8">
              <ContactUsCard showMenuList={false} text={`Top contact messages`} showSearch={false} showFilter={false} showPagination={false} contactUsData={spliceData} loading={isFetching} />
            </div>

        </div>


      </div>

    </div>
  );
}

export default EduConnectDashboard;
