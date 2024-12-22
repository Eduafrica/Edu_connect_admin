import Navbar from "../../Components/Helpers/Navbar";
import Sidebar from "../../Components/EduAfrica/Sidebar";
import Stats from "../../Components/EduAfrica/Stats";
import TopSearchCourse from "../../Components/EduAfrica/TopSearchCourse";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import TopClickedCourse from "../../Components/EduAfrica/TopClickedCourse";
import { useFetchTopClickedCourse, useFetchTopCourseSearch } from "../../Helpers/eduafrica/fetch.hooks";


function EduAfricaDashboard() {
    const { data: topSearchData, isFetching: loadingSearchData } = useFetchTopCourseSearch()
    const { data: topClickedData, isFetching: loadingClickedData } = useFetchTopClickedCourse()
  
  
    const topSearchCourse = topSearchData?.data?.splice(0, 5) || [].splice(0, 5)
    const topClickedCourse = topClickedData?.data.splice(0, 6) || [].splice(0, 6)

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

              <DashBoardLinks name={'eduafrica'} color={`!text-edu-main-color border-edu-main-color`} />

                <h1 className="title">
                  Dashboard
                </h1>

                <div className="">
                  <Stats />
                </div>


            </div>

            <div className="flex  items-start gap-[74px] justify-between">
                {/**fetch dat table two table */}
                <TopSearchCourse data={topSearchCourse} loading={loadingSearchData}  />
                <TopClickedCourse data={topClickedCourse} loading={loadingClickedData}  />
            </div>

        </div>


      </div>

    </div>
  );
}

export default EduAfricaDashboard;
