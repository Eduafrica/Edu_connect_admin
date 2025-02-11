import Navbar from "../../Components/Helpers/Navbar";
import DashBoardLinks from "../../Components/Helpers/DashBoardLinks";
import { useFetchNewsLetter } from "../../Helpers/fetch.hooks";
import Sidebar from "../../Components/EduConnect/Sidebar";
import NewsLetterCard from "../../Components/EduConnect/NewsLetterCard";

function EduConnectNewsletterList() {
  const { data: testimoniesData, isFetching } = useFetchNewsLetter()
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
            {/**TOP */}
            <div className="flex flex-col gap-[30px]">

                <DashBoardLinks name={'educonnect'} color={`text-edu-main-color border-edu-main-color`} />

                <h1 className="title">

                </h1>

                <div className=""></div>

            </div>

            {/**BOTTOM */}
            <div className="">
                 <NewsLetterCard newsLetterData={data} loading={isFetching} showFilter={true} showMenuList={false} showPagination={true} showSearch={true}  />
            </div>

        </div>


      </div>

    </div>
  );
}

export default EduConnectNewsletterList;
