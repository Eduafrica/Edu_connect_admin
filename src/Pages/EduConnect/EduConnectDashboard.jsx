import Navbar from "../../Components/Helpers/Navbar";
import Sidebar from "../../Components/EduConnect/Sidebar";
import Stats from "../../Components/EduConnect/Stats";
import TestimoniesCard from "../../Components/EduConnect/TestimoniesCard";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import { useFetchTestimonials } from "../../Helpers/educonnect/fetch.hooks";

function EduConnectDashboard() {
  const { data: testimoniesData, isFetching } = useFetchTestimonials()
  const data = testimoniesData?.data || []

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

              <DashBoardLinks name={'educonnect'} color={`text-edu-main-color border-edu-main-color`} />

                <h1 className="title">
                  Dashboard
                </h1>

                <div className="">
                  <Stats />
                </div>

            </div>

            <div className="mt-8">
              <TestimoniesCard showMenuList={false} text={`Top contact messages`} showSearch={false} showFilter={false} showPagination={false} testimonytData={data} loading={isFetching} />
            </div>

        </div>


      </div>

    </div>
  );
}

export default EduConnectDashboard;
